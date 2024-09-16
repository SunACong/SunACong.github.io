---
# 这是文章的标题
title: Docker开发环境安装
# 你可以自定义封面图片
cover: /assets/images/cover3.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: SunByte
# 设置写作时间
date: 2024-09-16
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 安装
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: false
# 你可以自定义页脚
footer: 欢迎来到SunByte的博客世界
# 你可以自定义版权信息
copyright: © 2024 SunByte. All rights reserved.
---

在本教程中，我们将学习利用Docker来安装常用的开发环境, 并进行配置。

<!-- more -->

## Mysql


```bash
1.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\mysql\log,E:\Docker-Image\DevelopEnviroment\mysql\data,E:\Docker-Image\DevelopEnviroment\mysql\conf,E:\Docker-Image\DevelopEnviroment\mysql\mysql-files

2.执行命令MySQL
docker run -p 3306:3306 --restart=always --name mysql -v E:\Docker-Image\DevelopEnviroment\mysql\log:/var/log/mysql -v E:\Docker-Image\DevelopEnviroment\mysql\data:/var/lib/mysql -v E:\Docker-Image\DevelopEnviroment\mysql\conf:/etc/mysql -v E:\Docker-Image\DevelopEnviroment\mysql\mysql-files:/var/lib/mysql-files -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.24

3.创建网络并连接容器
docker network create environment_my-network
docker network connect environment_my-network mysql
```

## Redis

```bash
1.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\redis\data

2.执行命令Redis
docker run -p 6379:6379 --restart=always --name redis -v E:\Docker-Image\DevelopEnviroment\redis\data:/data -d redis redis-server --appendonly yes --requirepass redis

3.连接容器
docker network connect environment_my-network redis
```

## Nginx

```bash
1.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\nginx\html,E:\Docker-Image\DevelopEnviroment\nginx\logs

2.执行命令Nginx
docker run -p 80:80 --restart=always --name nginx -v E:\Docker-Image\DevelopEnviroment\nginx\html:/usr/share/nginx/html -v E:\Docker-Image\DevelopEnviroment\nginx\logs:/var/log/nginx -d nginx

3.连接容器
docker network connect environment_my-network nginx

4.创建html.index
E:\Docker-Image\DevelopEnviroment\nginx\html中创建一个index.html文件，里面写hello world，可以在浏览器中通过nginx访问到
```

## RocketMQ

```bash
1.执行命令RabbitMQ
docker run -p 5672:5672 -p 15672:15672 --restart=always --name rabbitmq -d rabbitmq

2.进入容器并开启管理功能
docker exec -it rabbitmq /bin/bash
rabbitmq-plugins enable rabbitmq_management

3.连接容器
docker network connect environment_my-network rabbitmq


4.访问15672端口输入账号密码并登录：guest guest
```

## Elasticsearch

```bash
1.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\elasticsearch\plugins,E:\Docker-Image\DevelopEnviroment\elasticsearch\data,E:\Docker-Image\DevelopEnviroment\elasticsearch\config

2.在E:\Docker-Image\DevelopEnviroment\elasticsearch\config目录下创建elasticsearch.yml，并写入以下内容
http.host: 0.0.0.0

3.执行命令Elasticsearch
docker run -p 9200:9200 -p 9300:9300 --name elasticsearch --restart=always -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms256m -Xmx512m" -v E:\Docker-Image\DevelopEnviroment\elasticsearch\plugins:/usr/share/elasticsearch/plugins -v E:\Docker-Image\DevelopEnviroment\elasticsearch\data:/usr/share/elasticsearch/data -v E:\Docker-Image\DevelopEnviroment\elasticsearch\config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -d elasticsearch:7.17.5

4.进入容器内部并中文分词器
docker exec -it elasticsearch /bin/bash
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.5/elasticsearch-analysis-ik-7.17.5.zip

5.连接容器
docker network connect environment_my-network elasticsearch

6.重启容器
docker restart elasticsearch

7.访问
浏览器中访问localhost:9200
```

## Logstash

```bash
1.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\logstash\pipeline,E:\Docker-Image\DevelopEnviroment\logstash\config

2.在E:\Docker-Image\DevelopEnviroment\logstash\pipeline目录下创建logstash.conf，并写入以下内容
#日志采集入口，项目的logback会和这个input交互
input {
    tcp {
        #模式为 server
        mode => "server"
        #ip为logstash的地址
        host => "0.0.0.0"
        #监听的端口，以此端口获得日志数据
        port => 9413
        #数据格式为json
        codec => json_lines
    }
}
#日志存储目标：es
output {
    elasticsearch {
        hosts => "elasticsearch:9200"
        index => "springboot-logs-%{+YYYY.MM.dd}"
        codec => "json"
    }
}

3.在E:\Docker-Image\DevelopEnviroment\logstash\config目录下创建logstash.yml,并写入以下内容
api.http.host: 0.0.0.0
xpack.monitoring.elasticsearch.hosts: ["http://elasticsearch:9200"]

4.执行命令Logstash
docker run --name logstash --net environment_my-network -m 1000M --restart=always -p 9600:9600 -p 9413:9413 --privileged=true -e ES_JAVA_OPTS="-Duser.timezone=Asia/Shanghai" -v E:\Docker-Image\DevelopEnviroment\logstash\pipeline\logstash.conf:/usr/share/logstash/pipeline/logstash.conf -v E:\Docker-Image\DevelopEnviroment\logstash\config\logstash.yml:/usr/share/logstash/config/logstash.yml -d logstash:7.17.5

5.进入容器内部
docker exec -it logstash /bin/bash

6.json_lines插件
logstash-plugin install --no-verify logstash-codec-json_lines

7.访问
浏览器中访问localhost:9600
```

## Kibana

```bash
1.执行命令Kibana
docker run --name kibana --net environment_my-network --restart=always -p 5601:5601 -e "elasticsearch.hosts=http://elasticsearch:9200" -d kibana:7.17.5

2.访问
浏览器中访问localhost:5601
```

## nacos

```bash
1.在mysql中创建nacos数据库,并在nacos数据库中执行下面的sql脚本

2.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\nacos\conf

3.在E:\Docker-Image\DevelopEnviroment\nacos\conf目录下创建application.properties，并写入

4.执行命令nacos
docker run -d -p 8848:8848 --restart=always --net environment_my-network -e MODE=standalone -e JVM_XMS=256m -e JVM_XMX=256m -v E:\Docker-Image\DevelopEnviroment\nacos\conf\application.properties:/home/nacos/conf/application.properties --name nacos nacos/nacos-server:v2.1.1

5.浏览器中访问localhost:8848/nacos
```

1. **SQL脚本**
```sql
/*
* Copyright 1999-2018 Alibaba Group Holding Ltd.
*
* Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info   */
/******************************************/
CREATE TABLE `config_info` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
 `data_id` varchar(255) NOT NULL COMMENT 'data_id',
 `group_id` varchar(255) DEFAULT NULL,
 `content` longtext NOT NULL COMMENT 'content',
 `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
 `src_user` text COMMENT 'source user',
 `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
 `app_name` varchar(128) DEFAULT NULL,
 `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
 `c_desc` varchar(256) DEFAULT NULL,
 `c_use` varchar(64) DEFAULT NULL,
 `effect` varchar(64) DEFAULT NULL,
 `type` varchar(64) DEFAULT NULL,
 `c_schema` text,
 `encrypted_data_key` text NOT NULL COMMENT '秘钥',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_configinfo_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_aggr   */
/******************************************/
CREATE TABLE `config_info_aggr` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
 `data_id` varchar(255) NOT NULL COMMENT 'data_id',
 `group_id` varchar(255) NOT NULL COMMENT 'group_id',
 `datum_id` varchar(255) NOT NULL COMMENT 'datum_id',
 `content` longtext NOT NULL COMMENT '内容',
 `gmt_modified` datetime NOT NULL COMMENT '修改时间',
 `app_name` varchar(128) DEFAULT NULL,
 `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_configinfoaggr_datagrouptenantdatum` (`data_id`,`group_id`,`tenant_id`,`datum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='增加租户字段';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_beta   */
/******************************************/
CREATE TABLE `config_info_beta` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
 `data_id` varchar(255) NOT NULL COMMENT 'data_id',
 `group_id` varchar(128) NOT NULL COMMENT 'group_id',
 `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
 `content` longtext NOT NULL COMMENT 'content',
 `beta_ips` varchar(1024) DEFAULT NULL COMMENT 'betaIps',
 `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
 `src_user` text COMMENT 'source user',
 `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
 `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
 `encrypted_data_key` text NOT NULL COMMENT '秘钥',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_configinfobeta_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_beta';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_tag   */
/******************************************/
CREATE TABLE `config_info_tag` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
 `data_id` varchar(255) NOT NULL COMMENT 'data_id',
 `group_id` varchar(128) NOT NULL COMMENT 'group_id',
 `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
 `tag_id` varchar(128) NOT NULL COMMENT 'tag_id',
 `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
 `content` longtext NOT NULL COMMENT 'content',
 `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
 `src_user` text COMMENT 'source user',
 `src_ip` varchar(50) DEFAULT NULL COMMENT 'source ip',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_configinfotag_datagrouptenanttag` (`data_id`,`group_id`,`tenant_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_tag';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_tags_relation   */
/******************************************/
CREATE TABLE `config_tags_relation` (
 `id` bigint(20) NOT NULL COMMENT 'id',
 `tag_name` varchar(128) NOT NULL COMMENT 'tag_name',
 `tag_type` varchar(64) DEFAULT NULL COMMENT 'tag_type',
 `data_id` varchar(255) NOT NULL COMMENT 'data_id',
 `group_id` varchar(128) NOT NULL COMMENT 'group_id',
 `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
 `nid` bigint(20) NOT NULL AUTO_INCREMENT,
 PRIMARY KEY (`nid`),
 UNIQUE KEY `uk_configtagrelation_configidtag` (`id`,`tag_name`,`tag_type`),
 KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_tag_relation';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = group_capacity   */
/******************************************/
CREATE TABLE `group_capacity` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
 `group_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Group ID，空字符表示整个集群',
 `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
 `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
 `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
 `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数，，0表示使用默认值',
 `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
 `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='集群、各Group容量信息表';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = his_config_info   */
/******************************************/
CREATE TABLE `his_config_info` (
 `id` bigint(20) unsigned NOT NULL,
 `nid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `data_id` varchar(255) NOT NULL,
 `group_id` varchar(128) NOT NULL,
 `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
 `content` longtext NOT NULL,
 `md5` varchar(32) DEFAULT NULL,
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `src_user` text,
 `src_ip` varchar(50) DEFAULT NULL,
 `op_type` char(10) DEFAULT NULL,
 `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
 `encrypted_data_key` text NOT NULL COMMENT '秘钥',
 PRIMARY KEY (`nid`),
 KEY `idx_gmt_create` (`gmt_create`),
 KEY `idx_gmt_modified` (`gmt_modified`),
 KEY `idx_did` (`data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='多租户改造';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = tenant_capacity   */
/******************************************/
CREATE TABLE `tenant_capacity` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
 `tenant_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Tenant ID',
 `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
 `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
 `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
 `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数',
 `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
 `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='租户容量信息表';


CREATE TABLE `tenant_info` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
 `kp` varchar(128) NOT NULL COMMENT 'kp',
 `tenant_id` varchar(128) default '' COMMENT 'tenant_id',
 `tenant_name` varchar(128) default '' COMMENT 'tenant_name',
 `tenant_desc` varchar(256) DEFAULT NULL COMMENT 'tenant_desc',
 `create_source` varchar(32) DEFAULT NULL COMMENT 'create_source',
 `gmt_create` bigint(20) NOT NULL COMMENT '创建时间',
 `gmt_modified` bigint(20) NOT NULL COMMENT '修改时间',
 PRIMARY KEY (`id`),
 UNIQUE KEY `uk_tenant_info_kptenantid` (`kp`,`tenant_id`),
 KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='tenant_info';

CREATE TABLE `users` (
`username` varchar(50) NOT NULL PRIMARY KEY,
`password` varchar(500) NOT NULL,
`enabled` boolean NOT NULL
);

CREATE TABLE `roles` (
`username` varchar(50) NOT NULL,
`role` varchar(50) NOT NULL,
UNIQUE INDEX `idx_user_role` (`username` ASC, `role` ASC) USING BTREE
);

CREATE TABLE `permissions` (
   `role` varchar(50) NOT NULL,
   `resource` varchar(255) NOT NULL,
   `action` varchar(8) NOT NULL,
   UNIQUE INDEX `uk_role_permission` (`role`,`resource`,`action`) USING BTREE
);

INSERT INTO users (username, password, enabled) VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', TRUE);

INSERT INTO roles (username, role) VALUES ('nacos', 'ROLE_ADMIN');
```
2. **application.properties 文件**
```bash
server.servlet.contextPath=/nacos
server.error.include-message=ON_PARAM
server.port=8848


### If use MySQL as datasource:

spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://mysql:3306/nacos?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;allowPublicKeyRetrieval=true&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai
db.user.0=root
db.password.0=root

### Connection pool configuration: hikariCP

db.pool.config.connectionTimeout=30000
db.pool.config.validationTimeout=10000
db.pool.config.maximumPoolSize=20
db.pool.config.minimumIdle=2


nacos.naming.empty-service.auto-clean=true
nacos.naming.empty-service.clean.initial-delay-ms=50000
nacos.naming.empty-service.clean.period-time-ms=30000


management.metrics.export.elastic.enabled=false

management.metrics.export.influx.enabled=false

server.tomcat.accesslog.enabled=true

server.tomcat.accesslog.pattern=%h %l %u %t &quot;%r&quot; %s %b %D %{User-Agent}i %{Request-Source}i

server.tomcat.basedir=file:.

nacos.security.ignore.urls=/,/error,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-ui/public/**,/v1/auth/**,/v1/console/health/**,/actuator/**,/v1/console/server/**

nacos.core.auth.system.type=nacos

nacos.core.auth.enabled=false

nacos.core.auth.caching.enabled=true

nacos.core.auth.enable.userAgentAuthWhite=false

nacos.core.auth.server.identity.key=serverIdentity
nacos.core.auth.server.identity.value=security

nacos.core.auth.plugin.nacos.token.expire.seconds=18000

nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789

nacos.istio.mcp.server.enabled=false</code></pre></details>
```

## sentinel

```bash
1.执行命令sentinel
docker run --name sentinel --restart=always -p 8858:8858 -d bladex/sentinel-dashboard

2. 浏览器中访问localhost:8858
```

# <font style="color:rgba(0, 0, 0, 0.9);">seata</font>

```bash
1.在mysql中创建seata数据库，并在seata数据库中执行如下脚本

2.创建挂载目录
mkdir E:\Docker-Image\DevelopEnviroment\seata\resources

3.在E:\Docker-Image\DevelopEnviroment\seata\resources目录下创建application.yml，并写入

4.执行命令seata
docker run -d --name seata-server --restart=always --net environment_my-network -p 8091:8091 -p 7091:7091 -v E:\Docker-Image\DevelopEnviroment\seata\resources\application.yml:/seata-server/resources/application.yml seataio/seata-server:1.5.2
```
1. **SQL脚本**
```sql
--
-- Licensed to the Apache Software Foundation (ASF) under one or more
-- contributor license agreements. See the NOTICE file distributed with
-- this work for additional information regarding copyright ownership.
-- The ASF licenses this file to You under the Apache License, Version 2.0
-- (the &quot;License&quot;); you may not use this file except in compliance with
-- the License. You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--


-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
   `xid`                       VARCHAR(128) NOT NULL,
   `transaction_id`            BIGINT,
   `status`                    TINYINT      NOT NULL,
   `application_id`            VARCHAR(32),
   `transaction_service_group` VARCHAR(32),
   `transaction_name`          VARCHAR(128),
   `timeout`                   INT,
   `begin_time`                BIGINT,
   `application_data`          VARCHAR(2000),
   `gmt_create`                DATETIME,
   `gmt_modified`              DATETIME,
   PRIMARY KEY (`xid`),
   KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
   KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
 DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
   `branch_id`         BIGINT       NOT NULL,
   `xid`               VARCHAR(128) NOT NULL,
   `transaction_id`    BIGINT,
   `resource_group_id` VARCHAR(32),
   `resource_id`       VARCHAR(256),
   `branch_type`       VARCHAR(8),
   `status`            TINYINT,
   `client_id`         VARCHAR(64),
   `application_data`  VARCHAR(2000),
   `gmt_create`        DATETIME(6),
   `gmt_modified`      DATETIME(6),
   PRIMARY KEY (`branch_id`),
   KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
 DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
   `row_key`        VARCHAR(128) NOT NULL,
   `xid`            VARCHAR(128),
   `transaction_id` BIGINT,
   `branch_id`      BIGINT       NOT NULL,
   `resource_id`    VARCHAR(256),
   `table_name`     VARCHAR(32),
   `pk`             VARCHAR(36),
   `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
   `gmt_create`     DATETIME,
   `gmt_modified`   DATETIME,
   PRIMARY KEY (`row_key`),
   KEY `idx_status` (`status`),
   KEY `idx_branch_id` (`branch_id`),
   KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
 DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
   `lock_key`       CHAR(20) NOT NULL,
   `lock_value`     VARCHAR(20) NOT NULL,
   `expire`         BIGINT,
   primary key (`lock_key`)
) ENGINE = InnoDB
 DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```
2. **application.yml**
```bash
server:
    port: 7091


spring:
application:
  name: seata-server

logging:
config: classpath:logback-spring.xml
file:
  path: ${user.home}/logs/seata
extend:
  logstash-appender:
    destination: logstash:4560
  kafka-appender:
    bootstrap-servers: kafka:9092
    topic: logback_to_logstash

console:
user:
  username: seata
  password: seata

seata:
config:

   # support: nacos, consul, apollo, zk, etcd3

  type: nacos
  nacos:
    server-addr: nacos:8848
    namespace:
    group: SEATA_GROUP
    username: nacos
    password: nacos
    data-id: seataServer.properties
registry:

   # support: nacos, eureka, redis, zk, consul, etcd3, sofa

  type: nacos
  preferred-networks: 30.240.*
  nacos:
    application: seata-server
    server-addr: nacos:8848
    group: SEATA_GROUP
    namespace:
    cluster: default
    username: nacos
    password: nacos
store:

   # support: file 、 db 、 redis

  mode: db
  db:
    datasource: druid
    db-type: mysql
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://mysql:3306/seata?rewriteBatchedStatements=true&amp;characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;allowPublicKeyRetrieval=true&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai
    user: root
    password: root
    min-conn: 5
    max-conn: 100
    global-table: global_table
    branch-table: branch_table
    lock-table: lock_table
    distributed-lock-table: distributed_lock
    query-limit: 100
    max-wait: 5000

security:
  secretKey: SeataSecretKey0c382ef121d778043159209298fd40bf3850a017
  tokenValidityInMilliseconds: 1800000
  ignore:
    urls: /,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/api/v1/auth/login
```

## portainer

```bash
docker run -d --restart=always --name="portainer" -p 9000:9000 -v E:\Docker-Image\DevelopEnviroment\portainer\sock:/var/run/docker.sock -v E:\Docker-Image\DevelopEnviroment\portainer\data:/data 9687ac574ee92565144b6551b628318ce506886a5a93996a73e5ae781659de31
```

