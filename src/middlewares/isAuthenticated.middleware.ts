import express from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    if (!authToken && !refreshToken) {
        return res.status(401).json({
            message: "Authentication failed: No authToken or refreshToken provided..."
        });
    }
    jwt.verify(authToken, process.env.JWT_SECRET_KEY || "", (err: any, decoded: any) => {
        if (err) {
            // Auth token has expired, check the refresh token
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY || "", (refreshErr: any, refreshDecoded: any) => {
                // Both tokens are invalid, send an error message and prompt for login
                if (refreshErr) {
                    // Both tokens are invalid, send an error message and prompt for login
                    return res.status(401).json({
                        message: "Authentication failed: Both tokens are invalid...",
                        ok: false,
                    });
                } else {
                    // Generate new auth and refresh tokens
                    const newAuthToken = jwt.sign(
                        { userId: refreshDecoded.userId },
                        process.env.JWT_SECRET_KEY || "",
                        { expiresIn: "40m" }
                    );
                    const newRefreshToken = jwt.sign(
                        { userId: refreshDecoded.userId },
                        process.env.JWT_REFRESH_SECRET_KEY || "",
                        { expiresIn: "1d" }
                    );
                    // Set the new tokens as cookies in the response
                    res.cookie("authToken", newAuthToken, { httpOnly: true });
                    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
                    // Continue processing the request with the new auth token
                    Object.assign(req, { userId: refreshDecoded?.userId });
                    Object.assign(req, { ok: true });
                    next();
                }
            }
            );
        } else {
            Object.assign(req, { userId: decoded?.userId });
            next();
        }
    }
    );
}