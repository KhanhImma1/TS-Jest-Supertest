// const express = require("express");
import express from 'express'

export const app = express();

app.get("/api/campaigns", function (req, res) {
    res.status(200).json({ error: 0 });
    console.log('hello world!!!');
});

app.post("/api/campaign/add", function (req, res) {
    res.status(200).json({ error: 0 });
});