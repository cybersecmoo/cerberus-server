# Test Cases #

### A Summary of the Test Cases I'll be Checking ###

## Authentication ##

 - [x] Valid standard user login
 - [x] Login causes navbar links to change
 - [x] Logout causes navbar links to change
 - [x] Invalid login
 - [x] Valid standard user accessing admin-only endpoint
 - [x] Admin login
 - [x] Admin accessing admin-only endpoint
 - [x] Standard user accessing standard user endpoint

## User Management ##

 - [x] Only admins can manage other users
 - [x] Delete user
 - [x] Add user successfully
 - [x] Add user but with invalid password 
 - [ ] User changing their own password

## Commands ##

 - [ ] Queue a new command (of a couple different types) successfully
 - [ ] Invalid command-queueing
 - [ ] Create a new command type
 - [ ] Invalid new command (trying to create one with a decimal/negative arg count)

## Heartbeats/Targets ##

 - [ ] Heartbeat from new victim creates a new target entity
 - [ ] New target entity automatically appears in UI
 - [ ] Target data appears correctly
 - [ ] Commands sent back to implant

## Other ##

 - [ ] Network maps if we want
 - [ ] SFTP/SNMP server integration if we're so inclined