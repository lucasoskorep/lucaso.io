Title: Adding Yubikey as Passwordless Sudo Arch Linux
Date: 2024-12-03 18:18
Category: blog
Summary: Adding Yubikey as Passwordless sudo on a stock arch linux installation
Type: article
Tags: arch, archlinux, linux, test

1. Install required software for your yubikey 
```bash
yay -S yubikey-manager yubikeymanager-qt pam-u2f
```
2. create a u2f mappings file 
```bash
pamu2fcfg | sudo tee -a /etc/u2f_mappings
```
3. Create common-u2f file in /etc/pam.d
```bash
echo >> /etc/u2f_mappings
cd /etc/pam.d

echo 'auth sufficient pam_u2f.so authfile=/etc/u2f_mappings cue' > common-u2f
```
4. Add the following line to your /etc/pam.d/system-auth file directly in between the following lines
```bash
auth       include                     common-u2f
```
5. profit ????