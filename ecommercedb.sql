-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommercedb
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (1,'ADMIN');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,25),(26,1,26),(27,1,27),(28,1,28),(29,1,29),(30,1,30),(31,1,31),(32,1,32),(33,1,33),(34,1,34),(35,1,35),(36,1,36),(37,1,37),(38,1,38),(39,1,39),(40,1,40);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add category',6,'add_category'),(22,'Can change category',6,'change_category'),(23,'Can delete category',6,'delete_category'),(24,'Can view category',6,'view_category'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add product',8,'add_product'),(30,'Can change product',8,'change_product'),(31,'Can delete product',8,'delete_product'),(32,'Can view product',8,'view_product'),(33,'Can add product image',9,'add_productimage'),(34,'Can change product image',9,'change_productimage'),(35,'Can delete product image',9,'delete_productimage'),(36,'Can view product image',9,'view_productimage'),(37,'Can add role',10,'add_role'),(38,'Can change role',10,'change_role'),(39,'Can delete role',10,'delete_role'),(40,'Can view role',10,'view_role'),(41,'Can add primary group',11,'add_primarygroup'),(42,'Can change primary group',11,'change_primarygroup'),(43,'Can delete primary group',11,'delete_primarygroup'),(44,'Can view primary group',11,'view_primarygroup'),(45,'Can add secondary group',12,'add_secondarygroup'),(46,'Can change secondary group',12,'change_secondarygroup'),(47,'Can delete secondary group',12,'delete_secondarygroup'),(48,'Can view secondary group',12,'view_secondarygroup'),(49,'Can add group',13,'add_group'),(50,'Can change group',13,'change_group'),(51,'Can delete group',13,'delete_group'),(52,'Can view group',13,'view_group'),(53,'Can add sale info',14,'add_saleinfo'),(54,'Can change sale info',14,'change_saleinfo'),(55,'Can delete sale info',14,'delete_saleinfo'),(56,'Can view sale info',14,'view_saleinfo'),(57,'Can add attribute',15,'add_attribute'),(58,'Can change attribute',15,'change_attribute'),(59,'Can delete attribute',15,'delete_attribute'),(60,'Can view attribute',15,'view_attribute'),(61,'Can add address',16,'add_address'),(62,'Can change address',16,'change_address'),(63,'Can delete address',16,'delete_address'),(64,'Can view address',16,'view_address'),(65,'Can add shop',17,'add_shop'),(66,'Can change shop',17,'change_shop'),(67,'Can delete shop',17,'delete_shop'),(68,'Can view shop',17,'view_shop'),(69,'Can add review',18,'add_review'),(70,'Can change review',18,'change_review'),(71,'Can delete review',18,'delete_review'),(72,'Can view review',18,'view_review'),(73,'Can add comment',19,'add_comment'),(74,'Can change comment',19,'change_comment'),(75,'Can delete comment',19,'delete_comment'),(76,'Can view comment',19,'view_comment'),(77,'Can add review image',20,'add_reviewimage'),(78,'Can change review image',20,'change_reviewimage'),(79,'Can delete review image',20,'delete_reviewimage'),(80,'Can view review image',20,'view_reviewimage'),(81,'Can add order',21,'add_order'),(82,'Can change order',21,'change_order'),(83,'Can delete order',21,'delete_order'),(84,'Can view order',21,'view_order'),(85,'Can add order item',22,'add_orderitem'),(86,'Can change order item',22,'change_orderitem'),(87,'Can delete order item',22,'delete_orderitem'),(88,'Can view order item',22,'view_orderitem'),(89,'Can add payment',23,'add_payment'),(90,'Can change payment',23,'change_payment'),(91,'Can delete payment',23,'delete_payment'),(92,'Can view payment',23,'view_payment');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_ecommerceapp_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-11-28 13:18:23.424262','1','Thời Trang Nam',1,'[{\"added\": {}}]',6,1),(2,'2024-11-28 13:18:52.318438','2','Thời Trang Nữ',1,'[{\"added\": {}}]',6,1),(3,'2024-11-28 13:47:08.416820','3','Điện Thoại & Phụ Kiện',1,'[{\"added\": {}}]',6,1),(4,'2024-11-28 13:47:28.827039','4','Thiết Bị Điện Tử',1,'[{\"added\": {}}]',6,1),(5,'2024-11-28 13:47:50.748804','5','Nhà Cửa & Đời Sống',1,'[{\"added\": {}}]',6,1),(6,'2024-11-28 13:48:08.009020','6','Máy Tính & Laptop',1,'[{\"added\": {}}]',6,1),(7,'2024-11-28 13:48:14.172613','7','Sắc Đẹp',1,'[{\"added\": {}}]',6,1),(8,'2024-11-28 13:48:28.052488','8','Máy Ảnh & Máy Quay Phim',1,'[{\"added\": {}}]',6,1),(9,'2024-11-28 13:48:44.049076','9','Sức Khỏe',1,'[{\"added\": {}}]',6,1),(10,'2024-11-28 13:48:58.208572','10','Đồng Hồ',1,'[{\"added\": {}}]',6,1),(11,'2024-11-28 13:49:19.579574','11','Giày Dép Nữ',1,'[{\"added\": {}}]',6,1),(12,'2024-11-28 13:49:25.692449','12','Giày Dép Nam',1,'[{\"added\": {}}]',6,1),(13,'2024-11-28 13:49:33.453370','13','Túi Ví Nữ',1,'[{\"added\": {}}]',6,1),(14,'2024-11-28 13:49:43.314521','14','Thiết Bị Điện Gia Dụng',1,'[{\"added\": {}}]',6,1),(15,'2024-11-28 13:50:24.180851','15','Phụ Kiện & Trang Sức Nữ',1,'[{\"added\": {}}]',6,1),(16,'2024-11-28 13:50:33.033979','16','Thể Thao & Du Lịch',1,'[{\"added\": {}}]',6,1),(17,'2024-11-28 13:50:39.767482','17','Bách Hóa Online',1,'[{\"added\": {}}]',6,1),(18,'2024-11-28 13:50:55.802327','18','Ô Tô & Xe Máy & Xe Đạp',1,'[{\"added\": {}}]',6,1),(19,'2024-11-28 13:51:04.060902','19','Nhà Sách Online',1,'[{\"added\": {}}]',6,1),(20,'2024-11-28 13:51:29.929859','20','Balo & Túi Ví Nam',1,'[{\"added\": {}}]',6,1),(21,'2024-11-28 13:51:39.342145','21','Thời Trang Trẻ Em',1,'[{\"added\": {}}]',6,1),(22,'2024-11-28 13:51:51.919693','22','Đồ Chơi',1,'[{\"added\": {}}]',6,1),(23,'2024-11-28 13:52:06.401768','23','Giặt Giũ & Chăm Sóc Nhà Cửa',1,'[{\"added\": {}}]',6,1),(24,'2024-11-28 13:52:14.569947','24','Chăm Sóc Thú Cưng',1,'[{\"added\": {}}]',6,1),(25,'2024-11-28 13:52:27.134637','25','Voucher & Dịch Vụ',1,'[{\"added\": {}}]',6,1),(26,'2024-11-28 13:52:49.419781','26','Dụng cụ và thiết bị tiện ích',1,'[{\"added\": {}}]',6,1),(27,'2024-11-28 13:53:55.285148','27','Điện Thoại',1,'[{\"added\": {}}]',6,1),(28,'2024-11-28 13:54:14.965251','28','Máy Tính Bảng',1,'[{\"added\": {}}]',6,1),(29,'2024-11-28 13:54:29.693944','29','Thẻ Nhớ',1,'[{\"added\": {}}]',6,1),(30,'2024-11-28 13:55:21.354500','30','Áo Khoác',1,'[{\"added\": {}}]',6,1),(31,'2024-11-28 13:55:43.102649','31','Áo',1,'[{\"added\": {}}]',6,1),(32,'2024-11-28 13:56:00.574733','32','Quần Short',1,'[{\"added\": {}}]',6,1),(33,'2024-11-29 05:21:57.299243','1','ROLE_ADMIN',1,'[{\"added\": {}}]',10,1),(34,'2024-11-29 05:22:07.563625','2','ROLE_USER',1,'[{\"added\": {}}]',10,1),(35,'2024-11-29 05:23:05.874851','3','ROLE_SHOPKEEPER',1,'[{\"added\": {}}]',10,1),(36,'2024-11-29 05:23:23.962434','4','ROLE_STAFF',1,'[{\"added\": {}}]',10,1),(37,'2024-11-29 05:44:50.968830','1','admin',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Role\"]}}]',7,1),(38,'2024-11-29 05:46:38.519115','1','admin',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',7,1),(39,'2024-11-29 06:34:33.542239','1','ADMIN',1,'[{\"added\": {}}]',3,1),(40,'2024-11-29 14:22:18.737595','1','Màu sắc',1,'[{\"added\": {}}]',13,1),(41,'2024-11-29 14:22:35.000797','2','Màu sắc',1,'[{\"added\": {}}]',13,1),(42,'2024-11-29 14:22:41.469442','3','Màu sắc',1,'[{\"added\": {}}]',13,1),(43,'2024-11-29 14:37:56.575901','1','Màu Sắc',1,'[{\"added\": {}}]',13,1),(44,'2024-11-29 14:38:31.338629','2','Kích Thước',1,'[{\"added\": {}}]',13,1),(45,'2024-11-29 14:38:44.562637','1','Đỏ',1,'[{\"added\": {}}]',15,1),(46,'2024-11-29 14:38:47.924496','2','Xanh',1,'[{\"added\": {}}]',15,1),(47,'2024-11-29 14:38:57.935937','3','Vàng',1,'[{\"added\": {}}]',15,1),(48,'2024-11-29 14:40:34.302751','4','S',1,'[{\"added\": {}}]',15,1),(49,'2024-11-29 14:40:38.506606','5','M',1,'[{\"added\": {}}]',15,1),(50,'2024-11-29 14:40:44.683606','6','L',1,'[{\"added\": {}}]',15,1),(51,'2024-11-29 14:40:49.391924','7','XL',1,'[{\"added\": {}}]',15,1),(52,'2024-12-02 15:32:38.892207','1','admin',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',7,1),(53,'2024-12-02 15:39:39.756063','2','Staff01',1,'[{\"added\": {}}]',7,1),(54,'2024-12-02 15:40:52.377790','3','User01',1,'[{\"added\": {}}]',7,1),(55,'2024-12-02 15:42:03.745173','4','Shopkeeper01',1,'[{\"added\": {}}]',7,1),(56,'2024-12-02 15:45:35.011850','3','User01',2,'[{\"added\": {\"name\": \"address\", \"object\": \"S\\u1ed1 213, \\u0111\\u01b0\\u1eddng ABC, Ph\\u01b0\\u1eddng 2, B\\u00ecnh Th\\u1ea1nh, H\\u1ed3 Ch\\u00ed Minh \"}}, {\"added\": {\"name\": \"address\", \"object\": \"s\\u1ed1 832, \\u0111\\u01b0\\u1eddng CBC, B\\u00ecnh Tr\\u1ecb \\u0110\\u00f4ng, B\\u00ecnh T\\u00e2n, H\\u1ed3 Ch\\u00ed Minh \"}}]',7,1),(57,'2024-12-02 15:53:22.679449','1','Shop object (1)',1,'[{\"added\": {}}, {\"added\": {\"name\": \"address\", \"object\": \"S\\u1ed1 10, \\u0111\\u01b0\\u1eddng B, An L\\u1ea1c, B\\u00ecnh T\\u00e2n, H\\u1ed3 Ch\\u00ed Minh \"}}]',17,1),(58,'2024-12-02 15:53:40.341024','3','User01',2,'[{\"changed\": {\"name\": \"address\", \"object\": \"s\\u1ed1 832, \\u0111\\u01b0\\u1eddng CBC, B\\u00ecnh Tr\\u1ecb \\u0110\\u00f4ng, B\\u00ecnh T\\u00e2n, H\\u1ed3 Ch\\u00ed Minh \", \"fields\": [\"Is default\"]}}]',7,1),(59,'2024-12-10 03:50:59.015131','5','Staff02',1,'[{\"added\": {}}]',7,1),(60,'2024-12-10 05:22:44.175261','5','Staff02',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',7,1),(61,'2024-12-10 05:24:57.555104','6','Shopkeeper02',1,'[{\"added\": {}}]',7,1),(62,'2024-12-10 05:30:43.059956','2','Shop object (2)',1,'[{\"added\": {}}, {\"added\": {\"name\": \"address\", \"object\": \"S\\u1ed1 100, \\u0111\\u01b0\\u1eddng Hoa Gi\\u1ea5y, Ph\\u01b0\\u1eddng 9, Ph\\u00fa Nhu\\u1eadn, H\\u1ed3 Ch\\u00ed Minh \"}}]',17,1),(63,'2024-12-10 06:25:11.666911','3','User01',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',7,1),(64,'2024-12-10 06:47:24.810695','1','Áo thun nam polo cổ trụ ngắn tay phối màu chất liệu cotton 4 chiều cao cấp sang trọng lịch lãm',1,'[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (1)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (2)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (3)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (4)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (1)\"}}]',8,1),(65,'2024-12-10 06:56:14.123863','8','Đen',1,'[{\"added\": {}}]',15,1),(66,'2024-12-10 06:56:24.818965','9','Trắng',1,'[{\"added\": {}}]',15,1),(67,'2024-12-10 06:57:05.923439','2','Áo thun Choice FA1-0069-10 in chữ fight for your right dáng rộng tay lỡ, xu hướng',1,'[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (5)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (6)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (7)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (2)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (3)\"}}]',8,1),(68,'2024-12-10 07:41:41.121156','3','Quần Jeans Nam Phố Cao Cấp Hợp Thời Trang Nam 2024 Dạo Phố Rời Thẳng Xuân Thu',1,'[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (8)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (9)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (10)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (11)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (4)\"}}]',8,1),(69,'2024-12-10 07:46:05.875233','4','Xe đạp tập thể dục Fitness 2023',1,'[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (12)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (13)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (14)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (15)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (5)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (6)\"}}]',8,1),(70,'2024-12-10 07:48:53.838112','5','Máy chạy bộ điện đa năng HAMIGO SPORT tốc độ 14km có máy đánh bụng gấp gọn phù hợp tập thể dục tại nhà',1,'[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (16)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (17)\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"ProductImage object (18)\"}}, {\"added\": {\"name\": \"sale info\", \"object\": \"SaleInfo object (7)\"}}]',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(16,'ecommerceapp','address'),(15,'ecommerceapp','attribute'),(6,'ecommerceapp','category'),(19,'ecommerceapp','comment'),(13,'ecommerceapp','group'),(21,'ecommerceapp','order'),(22,'ecommerceapp','orderitem'),(23,'ecommerceapp','payment'),(11,'ecommerceapp','primarygroup'),(8,'ecommerceapp','product'),(9,'ecommerceapp','productimage'),(18,'ecommerceapp','review'),(20,'ecommerceapp','reviewimage'),(10,'ecommerceapp','role'),(14,'ecommerceapp','saleinfo'),(12,'ecommerceapp','secondarygroup'),(17,'ecommerceapp','shop'),(7,'ecommerceapp','user'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-11-28 09:39:33.626504'),(2,'contenttypes','0002_remove_content_type_name','2024-11-28 09:39:33.671209'),(3,'auth','0001_initial','2024-11-28 09:39:33.870415'),(4,'auth','0002_alter_permission_name_max_length','2024-11-28 09:39:33.915199'),(5,'auth','0003_alter_user_email_max_length','2024-11-28 09:39:33.918315'),(6,'auth','0004_alter_user_username_opts','2024-11-28 09:39:33.922440'),(7,'auth','0005_alter_user_last_login_null','2024-11-28 09:39:33.925545'),(8,'auth','0006_require_contenttypes_0002','2024-11-28 09:39:33.926566'),(9,'auth','0007_alter_validators_add_error_messages','2024-11-28 09:39:33.929716'),(10,'auth','0008_alter_user_username_max_length','2024-11-28 09:39:33.932830'),(11,'auth','0009_alter_user_last_name_max_length','2024-11-28 09:39:33.935940'),(12,'auth','0010_alter_group_name_max_length','2024-11-28 09:39:33.946370'),(13,'auth','0011_update_proxy_permissions','2024-11-28 09:39:33.950547'),(14,'auth','0012_alter_user_first_name_max_length','2024-11-28 09:39:33.953653'),(15,'ecommerceapp','0001_initial','2024-11-28 09:39:34.189065'),(16,'admin','0001_initial','2024-11-28 09:39:34.284960'),(17,'admin','0002_logentry_remove_auto_add','2024-11-28 09:39:34.290161'),(18,'admin','0003_logentry_add_action_flag_choices','2024-11-28 09:39:34.294294'),(19,'sessions','0001_initial','2024-11-28 09:39:34.317235'),(20,'ecommerceapp','0002_product_productimage','2024-11-28 10:15:22.777175'),(21,'ecommerceapp','0003_category_parent','2024-11-28 13:16:54.769478'),(22,'ecommerceapp','0004_alter_productimage_is_cover','2024-11-28 13:58:52.792329'),(23,'ecommerceapp','0005_remove_category_parent','2024-11-29 04:39:17.208354'),(24,'ecommerceapp','0006_role','2024-11-29 05:14:49.784812'),(25,'ecommerceapp','0007_user_avatar','2024-11-29 05:16:38.316886'),(26,'ecommerceapp','0008_user_role','2024-11-29 05:20:09.562267'),(27,'ecommerceapp','0009_alter_product_description','2024-11-29 06:45:47.998191'),(28,'ecommerceapp','0010_primarygroup_secondarygroup','2024-11-29 10:30:24.833655'),(29,'ecommerceapp','0011_group_delete_primarygroup_delete_secondarygroup','2024-11-29 14:09:36.443294'),(30,'ecommerceapp','0012_saleinfo','2024-11-29 14:16:20.316608'),(31,'ecommerceapp','0013_remove_saleinfo_secondary_group_and_more','2024-11-29 14:31:50.930592'),(32,'ecommerceapp','0014_group_attribute','2024-11-29 14:33:43.702123'),(33,'ecommerceapp','0015_saleinfo','2024-11-29 14:35:34.725846'),(34,'ecommerceapp','0016_address','2024-11-29 15:29:04.645364'),(35,'ecommerceapp','0017_user_addresses','2024-12-01 13:50:28.204295'),(36,'ecommerceapp','0018_shop','2024-12-01 14:17:48.316864'),(37,'ecommerceapp','0019_delete_shop','2024-12-01 14:21:37.129204'),(38,'ecommerceapp','0020_shop','2024-12-01 14:22:53.974310'),(39,'ecommerceapp','0021_product_shop','2024-12-01 14:27:01.976873'),(40,'ecommerceapp','0022_review_comment_reviewimage','2024-12-01 15:10:50.970715'),(41,'ecommerceapp','0023_alter_product_shop','2024-12-01 15:14:33.257859'),(42,'ecommerceapp','0024_alter_product_shop','2024-12-01 15:14:51.921653'),(43,'ecommerceapp','0025_alter_comment_reply_to_comment_alter_comment_review_and_more','2024-12-01 15:25:46.234382'),(44,'ecommerceapp','0026_order','2024-12-01 15:39:50.589768'),(45,'ecommerceapp','0027_orderitem','2024-12-01 16:07:49.893067'),(46,'ecommerceapp','0028_payment','2024-12-01 16:29:48.810700'),(47,'ecommerceapp','0029_remove_shop_address_remove_user_addresses','2024-12-02 07:30:33.826694'),(48,'ecommerceapp','0030_address_shop_address_user','2024-12-02 07:34:25.045791'),(49,'ecommerceapp','0031_alter_user_avatar','2024-12-02 15:23:48.708162'),(50,'ecommerceapp','0032_alter_productimage_image','2024-12-02 15:34:44.860351'),(51,'ecommerceapp','0033_alter_reviewimage_image_alter_shop_logo','2024-12-02 15:36:28.809087'),(52,'ecommerceapp','0034_alter_user_avatar','2024-12-10 04:08:29.743240'),(53,'ecommerceapp','0035_alter_product_brand_alter_product_origin_and_more','2024-12-10 06:41:06.811732'),(54,'ecommerceapp','0036_alter_saleinfo_primary_attr_and_more','2024-12-10 06:43:26.382292');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('gyqsgd6ikzrvzffx0vky971glbcg6nw8','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1khgGpGkhKuzL-uzbpQrf3nHNfLMK21riNvMSZ2JlJdvrdENIjtx3QHdqt89TbuszId4UfdPBrp_y8HO7fQYVRv3VKkwCDSYEtuiglpNZogixEQN4haCrJylKMCBaNzc7rMGXjhPPeELL3B_3sODo:1tGbdi:_nY0eIpYVA4m43XmjPu0fMmmdME83hSVv8bfD7U6jd8','2024-12-12 10:20:50.681988'),('zfnz91w5gk3nlv9qwhpb1wdvzpa77hg9','.eJxVjMsOwiAQRf-FtSFQ3i7d-w1khgGpGkhKuzL-uzbpQrf3nHNfLMK21riNvMSZ2JlJdvrdENIjtx3QHdqt89TbuszId4UfdPBrp_y8HO7fQYVRv3VKkwCDSYEtuiglpNZogixEQN4haCrJylKMCBaNzc7rMGXjhPPeELL3B_3sODo:1tGrva:mmUiph0Qakg6aqSiwTXb8nV5syIbta-VMzOaEHWmDjo','2024-12-13 03:44:22.635593');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_address`
--

DROP TABLE IF EXISTS `ecommerceapp_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `province_city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `ward_commune` varchar(100) NOT NULL,
  `address_details` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `type` varchar(20) NOT NULL,
  `shop_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shop_id` (`shop_id`),
  KEY `ecommerceapp_address_user_id_254fca18_fk_ecommerceapp_user_id` (`user_id`),
  CONSTRAINT `ecommerceapp_address_shop_id_252ab588_fk_ecommerceapp_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `ecommerceapp_shop` (`id`),
  CONSTRAINT `ecommerceapp_address_user_id_254fca18_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_address`
--

LOCK TABLES `ecommerceapp_address` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_address` DISABLE KEYS */;
INSERT INTO `ecommerceapp_address` VALUES (1,1,'2024-12-02 15:45:35.008850','2024-12-02 15:45:35.008850','Hồ Chí Minh','Bình Thạnh','Phường 2','Số 213, đường ABC','Lê Văn B','0392237872',1,'home',NULL,3),(2,1,'2024-12-02 15:45:35.010599','2024-12-02 15:53:40.340350','Hồ Chí Minh','Bình Tân','Bình Trị Đông','số 832, đường CBC','Lê Văn B','0392237872',0,'office',NULL,3),(3,1,'2024-12-02 15:53:22.679449','2024-12-02 15:53:22.679449','Hồ Chí Minh','Bình Tân','An Lạc','Số 10, đường B','Nguyen Anh D','0692227862',1,'home',1,NULL),(4,1,'2024-12-10 05:30:43.058954','2024-12-10 05:30:43.058954','Hồ Chí Minh','Phú Nhuận','Phường 9','Số 100, đường Hoa Giấy','Trần Văn K','0395551256',1,'office',2,NULL);
/*!40000 ALTER TABLE `ecommerceapp_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_attribute`
--

DROP TABLE IF EXISTS `ecommerceapp_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_attribute` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` varchar(30) NOT NULL,
  `group_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_attribu_group_id_aabcb8c9_fk_ecommerce` (`group_id`),
  CONSTRAINT `ecommerceapp_attribu_group_id_aabcb8c9_fk_ecommerce` FOREIGN KEY (`group_id`) REFERENCES `ecommerceapp_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_attribute`
--

LOCK TABLES `ecommerceapp_attribute` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_attribute` DISABLE KEYS */;
INSERT INTO `ecommerceapp_attribute` VALUES (1,'Đỏ',1),(2,'Xanh',1),(3,'Vàng',1),(4,'S',2),(5,'M',2),(6,'L',2),(7,'XL',2),(8,'Đen',1),(9,'Trắng',1);
/*!40000 ALTER TABLE `ecommerceapp_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_category`
--

DROP TABLE IF EXISTS `ecommerceapp_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_category`
--

LOCK TABLES `ecommerceapp_category` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_category` DISABLE KEYS */;
INSERT INTO `ecommerceapp_category` VALUES (1,1,'2024-11-28 13:18:23.423189','2024-11-28 13:18:23.423189','Thời Trang Nam'),(2,1,'2024-11-28 13:18:52.317412','2024-11-28 13:18:52.318438','Thời Trang Nữ'),(3,1,'2024-11-28 13:47:08.415815','2024-11-28 13:47:08.415815','Điện Thoại & Phụ Kiện'),(4,1,'2024-11-28 13:47:28.827039','2024-11-28 13:47:28.827039','Thiết Bị Điện Tử'),(5,1,'2024-11-28 13:47:50.747801','2024-11-28 13:47:50.747801','Nhà Cửa & Đời Sống'),(6,1,'2024-11-28 13:48:08.008015','2024-11-28 13:48:08.008015','Máy Tính & Laptop'),(7,1,'2024-11-28 13:48:14.171609','2024-11-28 13:48:14.171609','Sắc Đẹp'),(8,1,'2024-11-28 13:48:28.051483','2024-11-28 13:48:28.051483','Máy Ảnh & Máy Quay Phim'),(9,1,'2024-11-28 13:48:44.048036','2024-11-28 13:48:44.048036','Sức Khỏe'),(10,1,'2024-11-28 13:48:58.208572','2024-11-28 13:48:58.208572','Đồng Hồ'),(11,1,'2024-11-28 13:49:19.579574','2024-11-28 13:49:19.579574','Giày Dép Nữ'),(12,1,'2024-11-28 13:49:25.692449','2024-11-28 13:49:25.692449','Giày Dép Nam'),(13,1,'2024-11-28 13:49:33.452266','2024-11-28 13:49:33.452266','Túi Ví Nữ'),(14,1,'2024-11-28 13:49:43.314521','2024-11-28 13:49:43.314521','Thiết Bị Điện Gia Dụng'),(15,1,'2024-11-28 13:50:24.179805','2024-11-28 13:50:24.179805','Phụ Kiện & Trang Sức Nữ'),(16,1,'2024-11-28 13:50:33.032605','2024-11-28 13:50:33.032605','Thể Thao & Du Lịch'),(17,1,'2024-11-28 13:50:39.766406','2024-11-28 13:50:39.766406','Bách Hóa Online'),(18,1,'2024-11-28 13:50:55.802327','2024-11-28 13:50:55.802327','Ô Tô & Xe Máy & Xe Đạp'),(19,1,'2024-11-28 13:51:04.059802','2024-11-28 13:51:04.059802','Nhà Sách Online'),(20,1,'2024-11-28 13:51:29.929161','2024-11-28 13:51:29.929161','Balo & Túi Ví Nam'),(21,1,'2024-11-28 13:51:39.342145','2024-11-28 13:51:39.342145','Thời Trang Trẻ Em'),(22,1,'2024-11-28 13:51:51.919693','2024-11-28 13:51:51.919693','Đồ Chơi'),(23,1,'2024-11-28 13:52:06.401768','2024-11-28 13:52:06.401768','Giặt Giũ & Chăm Sóc Nhà Cửa'),(24,1,'2024-11-28 13:52:14.569947','2024-11-28 13:52:14.569947','Chăm Sóc Thú Cưng'),(25,1,'2024-11-28 13:52:27.134637','2024-11-28 13:52:27.134637','Voucher & Dịch Vụ'),(26,1,'2024-11-28 13:52:49.419781','2024-11-28 13:52:49.419781','Dụng cụ và thiết bị tiện ích');
/*!40000 ALTER TABLE `ecommerceapp_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_comment`
--

DROP TABLE IF EXISTS `ecommerceapp_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `content` longtext NOT NULL,
  `reply_to_comment_id` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `review_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_comment_user_id_244715d3_fk_ecommerceapp_user_id` (`user_id`),
  KEY `ecommerceapp_comment_reply_to_comment_id_20cc429b_fk_ecommerce` (`reply_to_comment_id`),
  KEY `ecommerceapp_comment_review_id_d8852292_fk_ecommerce` (`review_id`),
  CONSTRAINT `ecommerceapp_comment_reply_to_comment_id_20cc429b_fk_ecommerce` FOREIGN KEY (`reply_to_comment_id`) REFERENCES `ecommerceapp_comment` (`id`),
  CONSTRAINT `ecommerceapp_comment_review_id_d8852292_fk_ecommerce` FOREIGN KEY (`review_id`) REFERENCES `ecommerceapp_review` (`id`),
  CONSTRAINT `ecommerceapp_comment_user_id_244715d3_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_comment`
--

LOCK TABLES `ecommerceapp_comment` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_group`
--

DROP TABLE IF EXISTS `ecommerceapp_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_group`
--

LOCK TABLES `ecommerceapp_group` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_group` DISABLE KEYS */;
INSERT INTO `ecommerceapp_group` VALUES (1,'Màu Sắc'),(2,'Kích Thước');
/*!40000 ALTER TABLE `ecommerceapp_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_order`
--

DROP TABLE IF EXISTS `ecommerceapp_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_order_user_id_74dee816_fk_ecommerceapp_user_id` (`user_id`),
  CONSTRAINT `ecommerceapp_order_user_id_74dee816_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_order`
--

LOCK TABLES `ecommerceapp_order` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_orderitem`
--

DROP TABLE IF EXISTS `ecommerceapp_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `sale_info_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_orderit_order_id_b6b44e2f_fk_ecommerce` (`order_id`),
  KEY `ecommerceapp_orderit_sale_info_id_829684e5_fk_ecommerce` (`sale_info_id`),
  CONSTRAINT `ecommerceapp_orderit_order_id_b6b44e2f_fk_ecommerce` FOREIGN KEY (`order_id`) REFERENCES `ecommerceapp_order` (`id`),
  CONSTRAINT `ecommerceapp_orderit_sale_info_id_829684e5_fk_ecommerce` FOREIGN KEY (`sale_info_id`) REFERENCES `ecommerceapp_saleinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_orderitem`
--

LOCK TABLES `ecommerceapp_orderitem` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_orderitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_payment`
--

DROP TABLE IF EXISTS `ecommerceapp_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(20) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_payment_order_id_3069ec72_fk_ecommerceapp_order_id` (`order_id`),
  CONSTRAINT `ecommerceapp_payment_order_id_3069ec72_fk_ecommerceapp_order_id` FOREIGN KEY (`order_id`) REFERENCES `ecommerceapp_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_payment`
--

LOCK TABLES `ecommerceapp_payment` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_product`
--

DROP TABLE IF EXISTS `ecommerceapp_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `origin` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `shop_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_product_category_id_a6d36175_fk_ecommerce` (`category_id`),
  KEY `ecommerceapp_product_shop_id_27c9f568_fk_ecommerceapp_shop_id` (`shop_id`),
  CONSTRAINT `ecommerceapp_product_category_id_a6d36175_fk_ecommerce` FOREIGN KEY (`category_id`) REFERENCES `ecommerceapp_category` (`id`),
  CONSTRAINT `ecommerceapp_product_shop_id_27c9f568_fk_ecommerceapp_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `ecommerceapp_shop` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_product`
--

LOCK TABLES `ecommerceapp_product` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_product` DISABLE KEYS */;
INSERT INTO `ecommerceapp_product` VALUES (1,1,'2024-12-10 06:47:15.457366','2024-12-10 06:47:15.457366','Áo thun nam polo cổ trụ ngắn tay phối màu chất liệu cotton 4 chiều cao cấp sang trọng lịch lãm','<p><strong>&Aacute;o thun nam polo cổ trụ phối ngắn tay sọc viền nhiều m&agrave;u chất liệu cotton 4 chiều cao cấp sang trọng lịch l&atilde;m</strong></p>\r\n\r\n<p><strong>Th&ocirc;ng tin sản phẩm:</strong></p>\r\n\r\n<ul>\r\n	<li><strong>Chất liệu:</strong>&nbsp;Vải thun cotton cao cấp, 4 chiều co d&atilde;n mềm mại, thấm h&uacute;t mồ h&ocirc;i tốt, kh&ocirc;ng n&oacute;ng bức khi vận động nhiều, kh&ocirc;ng nhăn, kh&ocirc;ng co r&uacute;t sau khi giặt.</li>\r\n</ul>\r\n\r\n<p><strong>Đặc điểm nổi bật:</strong></p>\r\n\r\n<ul>\r\n	<li>Cổ &aacute;o v&agrave; tay &aacute;o phối m&agrave;u tinh tế tạo điểm nhấn thời trang bắt mắt.</li>\r\n	<li>Thiết kế trang nh&atilde;, m&agrave;u sắc ấn tượng, tiện dụng v&agrave; thoải m&aacute;i mang đến vẻ thanh lịch, tự tin cho người mặc.</li>\r\n	<li>Form &aacute;o su&ocirc;ng ph&ugrave; hợp với mọi độ tuổi, tay &aacute;o bo nhẹ khỏe khoắn.</li>\r\n	<li>&Aacute;o thun c&oacute; cổ rất đa năng, mặc được trong nhiều dịp kh&aacute;c nhau: đi dạo phố c&ugrave;ng bạn b&egrave;, đi phượt, mặc h&agrave;ng ng&agrave;y...</li>\r\n	<li>Với thiết kế đơn giản nhưng đẳng cấp, c&ugrave;ng với sự tiện dụng v&agrave; thoải m&aacute;i khi mặc.</li>\r\n</ul>\r\n\r\n<p><strong>Đ&ocirc;i n&eacute;t về sản phẩm &aacute;o thun nam phối m&agrave;u:</strong>&nbsp;&Aacute;o thun nam polo cổ trụ tay ngắn phối m&agrave;u mang lại vẻ đẹp độc đ&aacute;o v&agrave; s&agrave;nh điệu. Với viền phối m&agrave;u, &aacute;o tạo điểm nhấn độc đ&aacute;o v&agrave; thu h&uacute;t &aacute;nh nh&igrave;n. Cổ trụ v&agrave; tay ngắn tạo n&ecirc;n sự lịch l&atilde;m v&agrave; thanh lịch, phản &aacute;nh phong c&aacute;ch tinh tế v&agrave; hiện đại của người mặc. Sự kết hợp h&agrave;i h&ograve;a giữa c&aacute;c gam m&agrave;u tạo ra một &aacute;o thun polo kh&ocirc;ng chỉ l&agrave; một trang phục th&ocirc;ng thường m&agrave; c&ograve;n l&agrave; biểu tượng của sự phong c&aacute;ch v&agrave; c&aacute; nh&acirc;n.</p>\r\n\r\n<p><strong>Hướng dẫn c&aacute;ch sử dụng &amp; bảo quản &aacute;o thun polo nam trơn basic, &aacute;o polo nam c&oacute; cổ:</strong></p>\r\n\r\n<ul>\r\n	<li>Giặt ở nhiệt độ b&igrave;nh thường, với đồ c&oacute; m&agrave;u tương tự.</li>\r\n	<li>Kh&ocirc;ng được d&ugrave;ng h&oacute;a chất tẩy đối với sản phẩm &aacute;o nam polo.</li>\r\n	<li>Hạn chế sử dụng m&aacute;y sấy v&agrave; ủi ở nhiệt độ th&iacute;ch hợp.</li>\r\n	<li>Lộn mặt tr&aacute;i khi phơi tr&aacute;nh bị phai m&agrave;u.</li>\r\n</ul>\r\n\r\n<p><strong>Cam kết - Đảm bảo: &Aacute;o thun nam c&aacute; sấu vải cotton nhiều m&agrave;u cao cấp</strong></p>\r\n\r\n<ul>\r\n	<li>100% H&igrave;nh ảnh/Video được quay chụp bởi KENB CLOSET.</li>\r\n	<li>Đảm bảo vải chuẩn cotton chất lượng cao. &Aacute;o thun polo nam trơn basic, &aacute;o polo nam c&oacute; cổ.</li>\r\n	<li>H&agrave;ng c&oacute; sẵn, giao h&agrave;ng ngay khi nhận được đơn đặt h&agrave;ng.</li>\r\n	<li>Ho&agrave;n tiền 100% nếu sản phẩm lỗi, nhầm hoặc kh&ocirc;ng giống với m&ocirc; tả.</li>\r\n	<li>Chấp nhận đổi h&agrave;ng khi size kh&ocirc;ng vừa (vui l&ograve;ng nhắn tin ri&ecirc;ng cho shop).</li>\r\n</ul>\r\n\r\n<p><strong>Điều kiện đổi trả: &Aacute;o thun polo nam trơn basic, &aacute;o polo nam c&oacute; cổ</strong></p>\r\n\r\n<ul>\r\n	<li>Hỗ trợ trong v&ograve;ng 03 ng&agrave;y từ khi nhận h&agrave;ng, đổi size miễn ph&iacute; trong 10 ng&agrave;y.</li>\r\n	<li>H&agrave;ng ho&aacute; vẫn c&ograve;n mới nguy&ecirc;n tem m&aacute;c, chưa qua sử dụng.</li>\r\n</ul>\r\n\r\n<p><strong>Lưu &yacute;:</strong>&nbsp;Khi bạn gặp bất k&igrave; vấn đề g&igrave; về sản phẩm đừng vội đ&aacute;nh gi&aacute; m&agrave; h&atilde;y li&ecirc;n hệ Shop để được hỗ trợ. Kenb Closet cam kết sẽ giải quyết mọi khiếu nại v&agrave; l&agrave;m h&agrave;i l&ograve;ng qu&yacute; kh&aacute;ch h&agrave;ng.</p>','Origin Unknown','No Brand',NULL,1,1),(2,1,'2024-12-10 06:57:03.636641','2024-12-10 06:57:03.636641','Áo thun Choice FA1-0069-10 in chữ fight for your right dáng rộng tay lỡ, xu hướng','<p><strong>TH&Ocirc;NG TIN SẢN PHẨM</strong></p>\r\n\r\n<p><strong>T&ecirc;n sản phẩm:</strong> &Aacute;o thun Choice FA1-0069-10 in chữ &quot;Fight for Your Right&quot; d&aacute;ng rộng tay lỡ, xu hướng</p>\r\n\r\n<ul>\r\n	<li>&Aacute;o thun của ch&uacute;ng t&ocirc;i form &aacute;o chuẩn, nam nữ c&oacute; thể mặc c&ugrave;ng d&aacute;ng &aacute;o. Đủ size cho nam nữ. Chất liệu thun co d&atilde;n, d&agrave;y dặn, mặc m&aacute;t v&agrave; thấm h&uacute;t mồ h&ocirc;i, may chuẩn, kh&ocirc;ng lỗi lầm, h&igrave;nh in chất lượng như mẫu. Mực in bền m&agrave;u, thấm s&acirc;u v&agrave;o từng sợi vải, kh&ocirc;ng lem kh&ocirc;ng bong tr&oacute;c.</li>\r\n</ul>\r\n\r\n<p><strong>Hướng dẫn sử dụng v&agrave; bảo quản:</strong></p>\r\n\r\n<ul>\r\n	<li>Giặt ở nhiệt độ b&igrave;nh thường, với đồ c&oacute; m&agrave;u tương tự.</li>\r\n	<li>Kh&ocirc;ng d&ugrave;ng h&oacute;a chất tẩy.</li>\r\n	<li>Hạn chế sử dụng m&aacute;y sấy, ủi ở nhiệt độ th&iacute;ch hợp.</li>\r\n	<li>Lộn mặt tr&aacute;i khi phơi tr&aacute;nh phai m&agrave;u &aacute;o. Tr&aacute;nh phơi trực tiếp dưới nắng.</li>\r\n	<li>N&ecirc;n giặt ng&acirc;m qua với nước trước lần đầu cho bay hết bụi vải.</li>\r\n	<li>Kh&ocirc;ng giặt m&aacute;y trong 2 lần giặt đầu.</li>\r\n	<li>Giặt ở nhiệt độ b&igrave;nh thường, với đồ c&oacute; m&agrave;u tương tự.</li>\r\n	<li>Kh&ocirc;ng d&ugrave;ng h&oacute;a chất tẩy.</li>\r\n	<li>Hạn chế sử dụng m&aacute;y sấy v&agrave; ủi (nếu c&oacute;) th&igrave; ở nhiệt độ th&iacute;ch hợp.</li>\r\n</ul>\r\n\r\n<p><strong>Lưu &yacute; khi mua h&agrave;ng:</strong> Kh&aacute;ch tham khảo kỹ bảng size, m&ocirc; tả sản phẩm v&agrave; ảnh cận chất liệu để lựa chọn sản phẩm ph&ugrave; hợp với m&igrave;nh (tr&aacute;nh trường hợp mua sản phẩm kh&ocirc;ng ph&ugrave; hợp với &yacute; th&iacute;ch). Mọi thắc mắc kh&aacute;c vui l&ograve;ng li&ecirc;n hệ qua Shopee chat để được trả lời nhanh nhất.</p>','Việt Nam','No Brand',NULL,1,1),(3,1,'2024-12-10 07:41:31.068466','2024-12-10 07:41:31.068466','Quần Jeans Nam Phố Cao Cấp Hợp Thời Trang Nam 2024 Dạo Phố Rời Thẳng Xuân Thu','<p><strong>Độ d&agrave;y:</strong>&nbsp;Thường xuy&ecirc;n<br />\r\n<strong>M&ugrave;a &aacute;p dụng:</strong>&nbsp;Tất cả c&aacute;c m&ugrave;a<br />\r\n<strong>Cảnh &aacute;p dụng:</strong>&nbsp;H&agrave;ng ng&agrave;y<br />\r\n<strong>Đối tượng &aacute;p dụng:</strong>&nbsp;Thanh ni&ecirc;n<br />\r\n<strong>Phong c&aacute;ch cơ bản:</strong>&nbsp;Thanh ni&ecirc;n Phổ biến<br />\r\n<strong>Phong c&aacute;ch ph&acirc;n khu:</strong>&nbsp;Thủy triều<br />\r\n<strong>Chiều d&agrave;i quần:</strong>&nbsp;Quần<br />\r\n<strong>Vải Denim:</strong>&nbsp;Denim mỏng<br />\r\n<strong>Độ đ&agrave;n hồi:</strong>&nbsp;Vi nhựa<br />\r\n<strong>Loại eo:</strong>&nbsp;Eo giữa<br />\r\n<strong>Quần Hem Phong c&aacute;ch:</strong>&nbsp;Thẳng<br />\r\n<strong>Quần Placket:</strong>&nbsp;D&acirc;y k&eacute;o<br />\r\n<strong>Phi&ecirc;n bản phong c&aacute;ch:</strong>&nbsp;Thẳng lỏng<br />\r\n<strong>Chức năng vải:</strong>&nbsp;Chống bong tr&oacute;c</p>','Việt Nam','No Brand',NULL,1,1),(4,1,'2024-12-10 07:46:03.180154','2024-12-10 07:46:03.180154','Xe đạp tập thể dục Fitness 2023','<p>Xe đạp tập thể dục thể thao phi&ecirc;n bản cao cấp t&iacute;ch hợp cảm biến nhịp tim theo d&otilde;i sức khoe của bạn rất tiện &iacute;ch ! Bộ sản phầm tặng k&egrave;m gồm c&oacute; : Đồng hồ, cảm biến nhịp tim tr&ecirc;n tay cầm</p>','Trung Quốc','No Brand',NULL,16,2),(5,1,'2024-12-10 07:48:51.940020','2024-12-10 07:48:51.940020','Máy chạy bộ điện đa năng HAMIGO SPORT tốc độ 14km có máy đánh bụng gấp gọn phù hợp tập thể dục tại nhà','<ul>\r\n	<li><strong>M&aacute;y chạy bộ điện đa năng HAMIGO SPORT tốc độ 14km</strong>, m&aacute;y chạy ph&ugrave; hợp chạy tại gia đ&igrave;nh</li>\r\n	<li>Hệ thống điều chỉnh gồm nhiều ph&iacute;m chức năng kh&aacute;c nhau như tăng giảm tốc độ, c&aacute;c chương tr&igrave;nh chạy kh&aacute;c nhau</li>\r\n	<li>M&agrave;n h&igrave;nh LED điện tử hiển thị r&otilde; n&eacute;t c&aacute;c th&ocirc;ng số như: Tốc độ, Qu&atilde;ng đường, Thời gian, Calo</li>\r\n	<li>T&iacute;ch hợp kh&oacute;a từ an to&agrave;n khi bạn chạy với tốc độ cao</li>\r\n	<li>Đai chạy 7 lớp độ bền cực cao khi chạy</li>\r\n	<li>Bản n&acirc;ng cấp gồm động cơ, Bảng chạy, Con lăn khi chạy v&agrave; chip xử l&yacute; khi chạy tốc độ cao</li>\r\n	<li>C&ocirc;ng nghệ hấp thụ gi&uacute;p giảm tiếng ồn khi chạy</li>\r\n	<li>C&oacute; th&ecirc;m m&aacute;y đ&aacute;nh mỡ bụng gi&uacute;p bạn nhanh ch&oacute;ng giảm lượng mỡ của cơ thể</li>\r\n	<li>Tặng th&ecirc;m 2 tạ tay</li>\r\n	<li>Bản 14km N&acirc;ng Cấp từ th&aacute;ng 9 T&iacute;ch Hợp ĐO NHỊP TIM</li>\r\n</ul>','Trung Quốc','No Brand',NULL,16,2);
/*!40000 ALTER TABLE `ecommerceapp_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_productimage`
--

DROP TABLE IF EXISTS `ecommerceapp_productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_productimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `is_cover` tinyint(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_product_product_id_07d90aab_fk_ecommerce` (`product_id`),
  CONSTRAINT `ecommerceapp_product_product_id_07d90aab_fk_ecommerce` FOREIGN KEY (`product_id`) REFERENCES `ecommerceapp_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_productimage`
--

LOCK TABLES `ecommerceapp_productimage` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_productimage` DISABLE KEYS */;
INSERT INTO `ecommerceapp_productimage` VALUES (1,1,'2024-12-10 06:47:15.458665','2024-12-10 06:47:15.458665',1,'image/upload/v1733813238/wnsslmrtbm2xqrqllsqo.webp',1),(2,1,'2024-12-10 06:47:20.401409','2024-12-10 06:47:20.401409',0,'image/upload/v1733813240/aqvhylee3cdxerxv0ai5.webp',1),(3,1,'2024-12-10 06:47:21.784950','2024-12-10 06:47:21.784950',0,'image/upload/v1733813242/mg7djz1tufhswppwrrku.webp',1),(4,1,'2024-12-10 06:47:23.805788','2024-12-10 06:47:23.805788',0,'image/upload/v1733813243/scquftgwgl5sjrpjc4kc.webp',1),(5,1,'2024-12-10 06:57:03.637688','2024-12-10 06:57:03.637688',1,'image/upload/v1733813822/r3b5lrdibm7wr4mm21ii.webp',2),(6,1,'2024-12-10 06:57:04.239839','2024-12-10 06:57:04.239839',0,'image/upload/v1733813823/vqndglyclvs4ikb38w83.webp',2),(7,1,'2024-12-10 06:57:04.964409','2024-12-10 06:57:04.964409',0,'image/upload/v1733813824/c8legzircvw1lmrjk1y0.webp',2),(8,1,'2024-12-10 07:41:31.070522','2024-12-10 07:41:31.070522',1,'image/upload/v1733816495/bmmyw3ssxz5bqqwxlqiu.webp',3),(9,1,'2024-12-10 07:41:37.101135','2024-12-10 07:41:37.101135',0,'image/upload/v1733816496/quxjxsajk9ipjcnd7m14.webp',3),(10,1,'2024-12-10 07:41:38.204850','2024-12-10 07:41:38.204850',0,'image/upload/v1733816498/qx1tzuawtpyshdhrt1dv.webp',3),(11,1,'2024-12-10 07:41:40.030169','2024-12-10 07:41:40.030169',0,'image/upload/v1733816499/hu19msqur5fyfsdyrvpo.webp',3),(12,1,'2024-12-10 07:46:03.180154','2024-12-10 07:46:03.180154',1,'image/upload/v1733816762/rrfmbpkqfevvugxbkbab.webp',4),(13,1,'2024-12-10 07:46:03.773638','2024-12-10 07:46:03.773638',0,'image/upload/v1733816763/gewp0nfhrrmboablsqth.webp',4),(14,1,'2024-12-10 07:46:04.654100','2024-12-10 07:46:04.654100',0,'image/upload/v1733816763/hmyeawhqcovzdfhbgy8q.webp',4),(15,1,'2024-12-10 07:46:05.312368','2024-12-10 07:46:05.312368',0,'image/upload/v1733816764/jc1xg7wxhomnkx6x6tp4.webp',4),(16,1,'2024-12-10 07:48:51.940796','2024-12-10 07:48:51.940796',1,'image/upload/v1733816931/pniznqdlicvbo9ntacuv.webp',5),(17,1,'2024-12-10 07:48:52.562654','2024-12-10 07:48:52.562654',0,'image/upload/v1733816931/v5xu1fucauax0zkzkudd.webp',5),(18,1,'2024-12-10 07:48:53.149586','2024-12-10 07:48:53.149586',0,'image/upload/v1733816932/mchhteeh3b39sgnqtadi.webp',5);
/*!40000 ALTER TABLE `ecommerceapp_productimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_review`
--

DROP TABLE IF EXISTS `ecommerceapp_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `content` longtext NOT NULL,
  `rating` decimal(1,0) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_review_product_id_f30aedae_fk_ecommerce` (`product_id`),
  KEY `ecommerceapp_review_user_id_fa90e197_fk_ecommerceapp_user_id` (`user_id`),
  CONSTRAINT `ecommerceapp_review_product_id_f30aedae_fk_ecommerce` FOREIGN KEY (`product_id`) REFERENCES `ecommerceapp_product` (`id`),
  CONSTRAINT `ecommerceapp_review_user_id_fa90e197_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_review`
--

LOCK TABLES `ecommerceapp_review` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_reviewimage`
--

DROP TABLE IF EXISTS `ecommerceapp_reviewimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_reviewimage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `review_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_reviewi_review_id_c7e1b41f_fk_ecommerce` (`review_id`),
  CONSTRAINT `ecommerceapp_reviewi_review_id_c7e1b41f_fk_ecommerce` FOREIGN KEY (`review_id`) REFERENCES `ecommerceapp_review` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_reviewimage`
--

LOCK TABLES `ecommerceapp_reviewimage` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_reviewimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_reviewimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_role`
--

DROP TABLE IF EXISTS `ecommerceapp_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_role`
--

LOCK TABLES `ecommerceapp_role` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_role` DISABLE KEYS */;
INSERT INTO `ecommerceapp_role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER'),(3,'ROLE_SHOPKEEPER'),(4,'ROLE_STAFF');
/*!40000 ALTER TABLE `ecommerceapp_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_saleinfo`
--

DROP TABLE IF EXISTS `ecommerceapp_saleinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_saleinfo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `primary_attr_id` bigint DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `secondary_attr_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ecommerceapp_saleinf_primary_attr_id_8c9ebc50_fk_ecommerce` (`primary_attr_id`),
  KEY `ecommerceapp_saleinf_product_id_b81870f3_fk_ecommerce` (`product_id`),
  KEY `ecommerceapp_saleinf_secondary_attr_id_6683cf21_fk_ecommerce` (`secondary_attr_id`),
  CONSTRAINT `ecommerceapp_saleinf_primary_attr_id_8c9ebc50_fk_ecommerce` FOREIGN KEY (`primary_attr_id`) REFERENCES `ecommerceapp_attribute` (`id`),
  CONSTRAINT `ecommerceapp_saleinf_product_id_b81870f3_fk_ecommerce` FOREIGN KEY (`product_id`) REFERENCES `ecommerceapp_product` (`id`),
  CONSTRAINT `ecommerceapp_saleinf_secondary_attr_id_6683cf21_fk_ecommerce` FOREIGN KEY (`secondary_attr_id`) REFERENCES `ecommerceapp_attribute` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_saleinfo`
--

LOCK TABLES `ecommerceapp_saleinfo` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_saleinfo` DISABLE KEYS */;
INSERT INTO `ecommerceapp_saleinfo` VALUES (1,1,'2024-12-10 06:47:24.800756','2024-12-10 06:47:24.800756',300000.00,30,NULL,1,NULL),(2,1,'2024-12-10 06:57:05.923439','2024-12-10 06:57:05.923439',31000.00,20,8,2,NULL),(3,1,'2024-12-10 06:57:05.923439','2024-12-10 06:57:05.923439',32000.00,15,9,2,NULL),(4,1,'2024-12-10 07:41:41.121156','2024-12-10 07:41:41.121156',320000.00,33,NULL,3,NULL),(5,1,'2024-12-10 07:46:05.875233','2024-12-10 07:46:05.875233',2800000.00,10,8,4,NULL),(6,1,'2024-12-10 07:46:05.875233','2024-12-10 07:46:05.875233',2900000.00,3,1,4,NULL),(7,1,'2024-12-10 07:48:53.838112','2024-12-10 07:48:53.838112',2230000.00,5,NULL,5,NULL);
/*!40000 ALTER TABLE `ecommerceapp_saleinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_shop`
--

DROP TABLE IF EXISTS `ecommerceapp_shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_shop` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `logo` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `business_type` varchar(20) NOT NULL,
  `staff_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `ecommerceapp_shop_staff_id_caafcac4_fk_ecommerceapp_user_id` (`staff_id`),
  CONSTRAINT `ecommerceapp_shop_staff_id_caafcac4_fk_ecommerceapp_user_id` FOREIGN KEY (`staff_id`) REFERENCES `ecommerceapp_user` (`id`),
  CONSTRAINT `ecommerceapp_shop_user_id_43b4f939_fk_ecommerceapp_user_id` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_shop`
--

LOCK TABLES `ecommerceapp_shop` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_shop` DISABLE KEYS */;
INSERT INTO `ecommerceapp_shop` VALUES (1,1,'2024-12-02 15:53:14.833759','2024-12-02 15:53:14.833759','Shop thời trang Nam A','<p>Đ&acirc;y l&agrave; 1 shop thời trang rất l&agrave; uy t&iacute;nh v&agrave; nổi tiếng đ&oacute; nha!</p>','image/upload/v1733154802/lin4xq0zqx9et185dmks.png','ThoiTrangA@gmail.com','0692227862','individual',2,4),(2,1,'2024-12-10 05:30:38.953466','2024-12-10 05:30:38.953466','Shop dụng cụ thể dục B','<p>Chuy&ecirc;n b&aacute;n c&aacute;c loại dụng cụ thể dục</p>','image/upload/v1733808641/jgksvkez7ldbyxna4hhk.png','FitnessStoreB@gmail.com','0395551256','individual',2,6);
/*!40000 ALTER TABLE `ecommerceapp_shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_user`
--

DROP TABLE IF EXISTS `ecommerceapp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `ecommerceapp_user_role_id_ccea6a32_fk_ecommerceapp_role_id` (`role_id`),
  CONSTRAINT `ecommerceapp_user_role_id_ccea6a32_fk_ecommerceapp_role_id` FOREIGN KEY (`role_id`) REFERENCES `ecommerceapp_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_user`
--

LOCK TABLES `ecommerceapp_user` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_user` DISABLE KEYS */;
INSERT INTO `ecommerceapp_user` VALUES (1,'pbkdf2_sha256$870000$5jwMdz27r0bwTpwGW1SXHZ$4QYLb6EU9m5lX1+q3b4iv4Vob//4VFAu4mkM8nhqSMY=','2024-11-29 03:44:22.000000',1,'admin','Nhân','Lê Thành','admin@gmail.com',1,1,'2024-11-28 10:18:40.000000','image/upload/v1733153558/rthudy0eekzsdrhxni9r.jpg',1),(2,'123456',NULL,0,'Staff01','A','Nguyễn Văn','A@gmail.com',1,1,'2024-12-02 15:38:21.000000','image/upload/v1733153979/bner4pv49wzpw7hsg7oy.jpg',4),(3,'123456',NULL,0,'User01','B','Lê Văn','B@gmail.com',0,1,'2024-12-02 15:40:01.000000','image/upload/v1733153979/bner4pv49wzpw7hsg7oy.jpg',2),(4,'123456',NULL,0,'Shopkeeper01','C','Lê Trọng','C@gmail.com',0,1,'2024-12-02 15:41:04.000000','image/upload/v1733154123/omvki7ufbdxavln0uqxk.jpg',3),(5,'123456',NULL,0,'Staff02','G','Le Thi','ThiA@gmail.com',1,1,'2024-12-10 03:49:11.000000','image/upload/v1728619680/fc047347b17f7df7ff288d78c8c281cf_wncxc8.png',4),(6,'123456',NULL,0,'Shopkeeper02','D','Bui Ngoc','d@gmail.com',0,1,'2024-12-10 04:07:17.000000','image/upload/https://res.cloudinary.com/dthrh2pgj/image/upload/v1728619680/fc047347b17f7df7ff288d78c8c281cf_wncxc8.png',3);
/*!40000 ALTER TABLE `ecommerceapp_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_user_groups`
--

DROP TABLE IF EXISTS `ecommerceapp_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ecommerceapp_user_groups_user_id_group_id_342a730a_uniq` (`user_id`,`group_id`),
  KEY `ecommerceapp_user_groups_group_id_a9bb2943_fk_auth_group_id` (`group_id`),
  CONSTRAINT `ecommerceapp_user_gr_user_id_e44148e8_fk_ecommerce` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`),
  CONSTRAINT `ecommerceapp_user_groups_group_id_a9bb2943_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_user_groups`
--

LOCK TABLES `ecommerceapp_user_groups` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecommerceapp_user_user_permissions`
--

DROP TABLE IF EXISTS `ecommerceapp_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecommerceapp_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ecommerceapp_user_user_p_user_id_permission_id_59c4a3d2_uniq` (`user_id`,`permission_id`),
  KEY `ecommerceapp_user_us_permission_id_b74b25af_fk_auth_perm` (`permission_id`),
  CONSTRAINT `ecommerceapp_user_us_permission_id_b74b25af_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `ecommerceapp_user_us_user_id_10851a10_fk_ecommerce` FOREIGN KEY (`user_id`) REFERENCES `ecommerceapp_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecommerceapp_user_user_permissions`
--

LOCK TABLES `ecommerceapp_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `ecommerceapp_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `ecommerceapp_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10 15:03:17
