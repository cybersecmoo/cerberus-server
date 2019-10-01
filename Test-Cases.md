# Test Cases #

### A Summary of the Test Cases I'll be Checking ###

## Authentication ##

 - [ ] Valid standard user login
 - [ ] Invalid login
 - [ ] Valid standard user accessing admin-only endpoint
 - [ ] Admin login
 - [ ] Admin accessing admin-only endpoint
 - [ ] Standard user accessing standard user endpoint

## User Management ##

 - [ ] Only admins can manage other users
 - [ ] Delete user
 - [ ] Add user successfully
 - [ ] Add user but with invalid password 
 - [ ] User changing their own password

## Commands ##

 - [ ] Queue a new command (of a couple different types) successfully
 - [ ] Invalid command-queueing
 - [ ] Create a new command type

## Heartbeats/Targets ##

 - [ ] Heartbeat from new victim creates a new target entity
 - [ ] New target entity automatically appears in UI
 - [ ] Target data appears correctly
 - [ ] Commands sent back to implant

## Other ##

 - [ ] Network maps if we want
 - [ ] SFTP/SNMP server integration if we're so inclined