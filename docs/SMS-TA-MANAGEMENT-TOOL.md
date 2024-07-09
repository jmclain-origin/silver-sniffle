# SMS TA Management Tool (chem-webtools)

Arizona State University Schools of Molecular Science Teacher Assistant Management Tool

## Table of Contents

- [Introduction](#introduction)
  - [Legacy App](#legacy-app)
    - [Workflow](#workflow)
    - [Access](#access)
    - [Owner Requests](#owner-requests)
  - [New App](#new-app)
    - [Pipeline](#pipeline)
    - [Environments](#environments)
- [Installation](#installation)
  - [Prequisites](#prerequisites)
  - [Configuration](#configuration)
- [Resources & Links](#links-resources)

## Introduction

There are two versions of this app. **The legacy app** built using [classic ASP](http://webadress) and is hosted on a [IIS server](http://link) on campus. **The new app** is built using Nuxt2 and Express.js and is deployed on AWS infrastructure<sup>+</sup> using various services.

The new app is currently in development and is in an alpha phase release, production release schedule to go live for Spring 2025 semester. The Legacy app will remain in service until the Spring. No data or services are planned for migration from legacy to new app at this time. The new app will be all new data, infrastructure, and services. The legacy app will be decommissioned once the new app is deployed to production.

<sup>+</sup><sub>see diagram links</sub>

### Diagrams Links

- [current infrastructure]()
- [purposed infrastructure]()

## Legacy App

The legacy application codebase is located in a directory named `chem-webtools/webtools`<sup>+</sup> with a repo hosted on Github along with some other resources related to the application, i.e. SQL scripts and node.js scripts that have been used in various historical tasks request by the target audience.

<sup>+</sup>
<sub>*dupilcates folder on host machine (Windows Server 2018 OS)*</sub>  
<sub>*C:\chem-webtools\webtools*</sub>

### Workflow

The **HEAD** branch that is released for production is `1.1.0-Dev` this branch contains the most recent code used in deployment at the domain [chem-webtools.asu.edu/webtools](https://chem-webtools.asu.edu/webtools)

> :warning: There is no CI/CD pipeline for the legacy app. The app is deployed manually by remote connection via RDP.

#### Making Changes / Updates

There are two ways to make changes to the legacy app depending on requirements will determine which method is used.

- **Method 1:** Changes made to static content. The changes should be merged to the `1.1.0-Dev` branch (path: `chem-webtools/*`) this is for tracking purposes only. **Copy** the diff files from the file tree and **Paste** to its corresponding path on production server. These changes will go live instantly at [chrem-webtools.asu.edu/webtools](https://chem-webtools.asu.edu/webtools)

> :point_up: In most cases *copy & paste* will work fine. Sometimes when coping files (usually when it just a single file) it will fail with an error stating **permission denied**.  
> If you receive this error, you can [bypass using a terminal and run as administratoerater](https://learn.microsoft.com/en-us/troubleshoot/windows-server/shell-experience/use-run-as-start-app-admin) to copy the files to the restricted directory on the server.

- **Method 2:** Changes made to SQL database. The changes should be merged to the `1.1.0-Dev` branch (path: `sql-queries/*` or `node-scripts/*`) this is for tracking purposes only. To update production data you will need to submit the SQL query to [ASU Service Now](https://asu.service-now.com/)<sup>+</sup> by requesting service for database administration.

  <sup>+</sup><sub>Home -> Service Catalog -> Infrastructure -> Database -> Database Administration</sub>

### Access

Access to the production server and database is restricted and can only be connected to on a Windows machine with [Remote Desktop Protocol (RDP)](https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/understanding-remote-desktop-protocol) through [ASU VPN](https://sslvpn.asu.edu/2fa)

#### Instructions for connecting to RDP

[legacy app connect to prod](./HOW_TO_CONNECT_LEGACY.md)