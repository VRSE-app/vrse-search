# ElasticSearch deployment

- hosted on UpCloud - fixed price plan

- ElasticSearch already installed on Ubuntu VM

To start Elasticsearch service and enable it to start at boot

```bash
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch
```

Afterwards you can check the status of the service with the following command

```bash
sudo systemctl status elasticsearch
```

The firewall was already configured once according to: https://upcloud.com/community/tutorials/install-configure-elasticsearch/


## Connect to remote server with port forwarding

```bash
ssh root@83.136.249.107 -L 9201:localhost:9200
```

Restart ElasticSearch Service

```bash
service elasticsearch restart
```


ssh root@83.136.249.107 -L 9201:localhost:9200