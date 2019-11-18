-- Author: Andy Nimmo
-- Project: UEE.life

-- ************************************** `Archetype`

CREATE TABLE `Archetype`
(
 `id`   int NOT NULL ,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Activity_Type`

CREATE TABLE `Activity_Type`
(
 `id`   int NOT NULL ,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Commit_type`

CREATE TABLE `Commit_type`
(
 `id`   int NOT NULL ,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Character`

CREATE TABLE `Character`
(
 `id`           int NOT NULL ,
 `name`         varchar(45) NOT NULL ,
 `handle`       varchar(45) NOT NULL ,
 `ucr`          int NOT NULL ,
 `title`        varchar(45) NOT NULL ,
 `bio`          varchar(45) NOT NULL ,
 `affiliations` int NOT NULL ,
 `hash`         varchar(45) NOT NULL ,
 `outlaw`       boolean NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Government`

CREATE TABLE `Government`
(
 `id`    int NOT NULL ,
 `name`  varchar(45) NOT NULL ,
 `abbrv` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ******************************* `Language`

CREATE TABLE `Language`
(
 `id`    int NOT NULL ,
 `name`  varchar(45) NOT NULL ,
 `abbrv` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Manufacturer`

CREATE TABLE `Manufacturer`
(
 `id`    int NOT NULL ,
 `name`  varchar(45) NOT NULL ,
 `abbrv` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Location_Type`

CREATE TABLE `Location_Type`
(
 `id`   int NOT NULL ,
 `type` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `POI_Colour`

CREATE TABLE `POI_Colour`
(
 `id`     int NOT NULL ,
 `colour` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `POI_Type`

CREATE TABLE `POI_Type`
(
 `id`   int NOT NULL ,
 `type` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Service_Type`

CREATE TABLE `Service_Type`
(
 `id`   int NOT NULL ,
 `type` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Ship_Role`

CREATE TABLE `Ship_Role`
(
 `id`       int NOT NULL ,
 `role`     varchar(45) NOT NULL ,
 `sub_role` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `System_Type`

CREATE TABLE `System_Type`
(
 `id`          int NOT NULL ,
 `description` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `Organisation`

CREATE TABLE `Organisation`
(
 `id`              int NOT NULL ,
 `name`            varchar(45) NOT NULL ,
 `SID`             varchar(45) NOT NULL ,
 `rank`            smallint NOT NULL ,
 `spectrum_id`     varchar(45) NOT NULL ,
 `roleplay`        boolean NOT NULL ,
 `excl_membership` boolean NOT NULL ,
 `intro`           text NOT NULL ,
 `history`         mediumtext NOT NULL ,
 `manifesto`       mediumtext NOT NULL ,
 `charter`         mediumtext NOT NULL ,
 `image_link`      text NOT NULL ,
 `video_link`      text NOT NULL ,
 `outlaw`          boolean NOT NULL ,
 `member_since`    date NOT NULL ,
 `archetype`       int NOT NULL ,
 `pri_activity`    int NOT NULL ,
 `sec_activity`    int NOT NULL ,
 `commitment`      int NOT NULL ,
 `pri_lang`        int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_115` (`archetype`),
CONSTRAINT `FK_115` FOREIGN KEY `fkIdx_115` (`archetype`) REFERENCES `Archetype` (`id`),
KEY `fkIdx_118` (`pri_activity`),
CONSTRAINT `FK_118` FOREIGN KEY `fkIdx_118` (`pri_activity`) REFERENCES `Activity_Type` (`id`),
KEY `fkIdx_121` (`commitment`),
CONSTRAINT `FK_121` FOREIGN KEY `fkIdx_121` (`commitment`) REFERENCES `Commit_type` (`id`),
KEY `fkIdx_124` (`pri_lang`),
CONSTRAINT `FK_124` FOREIGN KEY `fkIdx_124` (`pri_lang`) REFERENCES `Language` (`id`),
KEY `fkIdx_130` (`sec_activity`),
CONSTRAINT `FK_130` FOREIGN KEY `fkIdx_130` (`sec_activity`) REFERENCES `Activity_Type` (`id`)
);


-- ************************************** `System`

CREATE TABLE `System`
(
 `id`          int NOT NULL ,
 `name`        varchar(45) NOT NULL ,
 `description` text NOT NULL ,
 `type`        int NOT NULL ,
 `affiliation` int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_203` (`type`),
CONSTRAINT `FK_203` FOREIGN KEY `fkIdx_203` (`type`) REFERENCES `System_Type` (`id`),
KEY `fkIdx_211` (`affiliation`),
CONSTRAINT `FK_211` FOREIGN KEY `fkIdx_211` (`affiliation`) REFERENCES `Government` (`id`)
);


-- ************************************** `Location`

CREATE TABLE `Location`
(
 `id`          int NOT NULL ,
 `name`        varchar(45) NOT NULL ,
 `description` text NOT NULL ,
 `designation` varchar(45) NOT NULL ,
 `habitable`   boolean NOT NULL ,
 `danger`      smallint NOT NULL ,
 `economy`     smallint NOT NULL ,
 `population`  int NOT NULL ,
 `thumbnail`   text NOT NULL ,
 `outlaw`      boolean NOT NULL ,
 `sea_level`   float NOT NULL ,
 `atmo_edge`   float NOT NULL ,
 `om_radius`   float NOT NULL ,
 `type`        int NOT NULL ,
 `system`      int NOT NULL ,
 `affiliation` int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_188` (`type`),
CONSTRAINT `FK_188` FOREIGN KEY `fkIdx_188` (`type`) REFERENCES `Location_Type` (`id`),
KEY `fkIdx_196` (`system`),
CONSTRAINT `FK_196` FOREIGN KEY `fkIdx_196` (`system`) REFERENCES `System` (`id`),
KEY `fkIdx_214` (`affiliation`),
CONSTRAINT `FK_214` FOREIGN KEY `fkIdx_214` (`affiliation`) REFERENCES `Government` (`id`)
);

-- ************************************** `Cust_POI`

CREATE TABLE `Cust_POI`
(
 `id`           int NOT NULL ,
 `name`         varchar(45) NOT NULL ,
 `description`  text NOT NULL ,
 `altitude`     float NOT NULL ,
 `json_array`   text NOT NULL ,
 `public`       boolean NOT NULL ,
 `org_viewable` boolean NOT NULL ,
 `date_created` date NOT NULL ,
 `colour`       int NOT NULL ,
 `type`         int NOT NULL ,
 `organisation` int NOT NULL ,
 `character`    int NOT NULL ,
 `location`     int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_231` (`colour`),
CONSTRAINT `FK_231` FOREIGN KEY `fkIdx_231` (`colour`) REFERENCES `POI_Colour` (`id`),
KEY `fkIdx_234` (`type`),
CONSTRAINT `FK_234` FOREIGN KEY `fkIdx_234` (`type`) REFERENCES `POI_Type` (`id`),
KEY `fkIdx_237` (`organisation`),
CONSTRAINT `FK_237` FOREIGN KEY `fkIdx_237` (`organisation`) REFERENCES `Organisation` (`id`),
KEY `fkIdx_240` (`character`),
CONSTRAINT `FK_240` FOREIGN KEY `fkIdx_240` (`character`) REFERENCES `Character` (`id`),
KEY `fkIdx_243` (`location`),
CONSTRAINT `FK_243` FOREIGN KEY `fkIdx_243` (`location`) REFERENCES `Location` (`id`)
);


-- ************************************** `Organisation_Map`

CREATE TABLE `Organisation_Map`
(
 `id`              int NOT NULL ,
 `character_id`    int NOT NULL ,
 `organisation_id` int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_75` (`character_id`),
CONSTRAINT `FK_75` FOREIGN KEY `fkIdx_75` (`character_id`) REFERENCES `Character` (`id`),
KEY `fkIdx_95` (`organisation_id`),
CONSTRAINT `FK_95` FOREIGN KEY `fkIdx_95` (`organisation_id`) REFERENCES `Organisation` (`id`)
);


-- ************************************** `POI`

CREATE TABLE `POI`
(
 `id`         int NOT NULL ,
 `name`       varchar(45) NOT NULL ,
 `altitude`   float NOT NULL ,
 `json_array` text NOT NULL ,
 `outlaw`     boolean NOT NULL ,
 `type`       int NOT NULL ,
 `owner`      int NOT NULL ,
 `location`   int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_154` (`type`),
CONSTRAINT `FK_154` FOREIGN KEY `fkIdx_154` (`type`) REFERENCES `POI_Type` (`id`),
KEY `fkIdx_160` (`owner`),
CONSTRAINT `FK_160` FOREIGN KEY `fkIdx_160` (`owner`) REFERENCES `Organisation` (`id`),
KEY `fkIdx_181` (`location`),
CONSTRAINT `FK_181` FOREIGN KEY `fkIdx_181` (`location`) REFERENCES `Location` (`id`)
);


-- ************************************** `Service_Map`

CREATE TABLE `Service_Map`
(
 `id`         int NOT NULL ,
 `service_id` int NOT NULL ,
 `poi_id`     int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_140` (`service_id`),
CONSTRAINT `FK_140` FOREIGN KEY `fkIdx_140` (`service_id`) REFERENCES `Service_Type` (`id`),
KEY `fkIdx_157` (`poi_id`),
CONSTRAINT `FK_157` FOREIGN KEY `fkIdx_157` (`poi_id`) REFERENCES `POI` (`id`)
);


-- ************************************** `Ship`

CREATE TABLE `Ship`
(
 `id`          int NOT NULL ,
 `variant`     varchar(45) NOT NULL ,
 `role`        varchar(45) NOT NULL ,
 `description` text NOT NULL ,
 `make`        int NOT NULL ,
 `basemodel`   int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_56` (`make`),
CONSTRAINT `FK_56` FOREIGN KEY `fkIdx_56` (`make`) REFERENCES `Manufacturer` (`id`),
KEY `fkIdx_64` (`basemodel`),
CONSTRAINT `FK_64` FOREIGN KEY `fkIdx_64` (`basemodel`) REFERENCES `Ship_Role` (`id`)
);


-- ************************************** `Ship_Map`

CREATE TABLE `Ship_Map`
(
 `id`           int NOT NULL ,
 `character_id` int NOT NULL ,
 `ship_id`      int NOT NULL ,

PRIMARY KEY (`id`),
KEY `fkIdx_25` (`character_id`),
CONSTRAINT `FK_25` FOREIGN KEY `fkIdx_25` (`character_id`) REFERENCES `Character` (`id`),
KEY `fkIdx_45` (`ship_id`),
CONSTRAINT `FK_45` FOREIGN KEY `fkIdx_45` (`ship_id`) REFERENCES `Ship` (`id`)
);


