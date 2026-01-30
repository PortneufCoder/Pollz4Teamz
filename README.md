# Pollz4Teamz
My final capstone project during BrainStation

## Project structure
- client/ (React app)
- server/ (Express + Socket.io)

## Requirements
- Node.js 20.19+ (or 22.12+)
- npm 9+

####
This is a polling app that uses sockets to communicate data between the server and client. It provides a UI where
team leaders could quickly poll fellow employees on a specific issue.

Key features:

1. User connects and name is registered.
2. Status of connection is sent from the server and actively displayed on page
3. Amount of connected members are logged to page, so a potential manager would know how many employees have 
⋅accessed the survey
4. Once completed, the results of the poll are graphed onto a chart.
5. There is an error-handling route in case a user navigates to the wrong page. 

## Getting started
From the repo root:

1) Install server dependencies
	- cd server
	- npm install
	- npm run dev

2) Install client dependencies (in a new terminal)
	- cd client
	- npm install
	- npm run dev

## Environment
The client can read the socket URL from `VITE_SOCKET_URL`.
