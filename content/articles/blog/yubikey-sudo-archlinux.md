Title: Adding Yubikey as Passwordless Sudo on Arch Linux
Date: 2023-12-03 18:18
Category: blog
Summary: Adding Yubikey as Passwordless sudo on a stock arch linux installation
Type: article
Tags: arch, archlinux, linux, yubikey


1\. Install required software for your yubikey
```bash
yay -S yubikey-manager yubikeymanager-qt pam-u2f
```
2\. Create an u2f mappings file
```bash
pamu2fcfg | sudo tee -a /etc/u2f_mappings
```
3\. Create common-u2f file in /etc/pam.d
```bash
echo >> /etc/u2f_mappings
cd /etc/pam.d

echo 'auth sufficient pam_u2f.so authfile=/etc/u2f_mappings cue' > common-u2f
```

4\. At this point you are about to make changes to your auth system.  

**For safety, you need to have another TTY open with sudo permissions already granted, so you can roll back changes
if necessary.**

Do so by using control+alt+f3 (change the f key depending on your tty config).  Login and type sudo su to get an elevated prompt.


5\. Add this line
```bash
auth       include                     common-u2f
```
into to your /etc/pam.d/system-auth file directly in between the systemd and unix checks like this:  

```bash
# this checks for existing auth
auth       [success=2 default=ignore]  pam_systemd_home.so
# if not found use u2f if it is plugged in
auth       include                     common-u2f
# if no u2f then login normally with password
auth       [success=1 default=bad]     pam_unix.so          try_first_pass nullok
```

6\. Test it out and make sure that it works in a new TTY or terminal window!