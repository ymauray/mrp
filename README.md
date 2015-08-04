# mrp

Install git

Install gradle

Install Node and npm

Update node and npm to the latest stable version :

    $ sudo npm install -g n
    $ sudo n stable

Install bower :

    $ sudo npm install -g bower
    
----

Get the source code :

    $ git clone https://github.com/ymauray/mrp.git
    $ cd mrp
    
Get the javascript components :

    $ bower install
    
----

Install Apache 2 modules :

    $ sudo a2enmod ssl
    $ sudo a2enmod proxy
    $ sudo a2enmod proxy_http

Assuming the hostname is "www.myhost.com" and the application is deployed on Tomcat under "/myapp" context, configure Apache virtual host :

    <VirtualHost *:80>
        ServerName www.myhost.com
        ServerAlias myhost.com
        ServerSignature off
        Redirect / https://www.myhost.com
    </VirtualHost>
    
    <VirtualHost>
        ServerName www.myhost.com
        ServerAlias myhost.com
        ServerSignature off
        SSLEngine on
        SSLProtocol all -SSLv2
        SSLCipherSuite ALL:!ADH:!EXPORT:!SSLv2:RC4+RSA:+HIGH:+MEDIUM
        SSLCertificateFile /etc/ssl/myhost.com.crt
        SSLCertificateKeyFile /etc/ssl/myhost.com.key
        
        ProxyPass / http://localhost:8080/myapp/
        ProxyPassReverse / http://localhost:8080/myapp/
        
        ErrorLog ${APACHE_LOG_DIR}/myapp/error.log
        LogLevel warn
        CustomLog ${APACHE_LOG_DIR}/myapp/access.log combined
    </VirtualHost>

To generate self signed certificates for "www.myhost.com", valid 10 years :

    $ sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/ssl/myhost.com.key -out /etc/ssl/myhost.com.crt
    
Run and enjoy !