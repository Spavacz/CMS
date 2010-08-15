--
-- Baza danych: `CMS`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `blocks`
--

CREATE TABLE IF NOT EXISTS `blocks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `blocks_pages`
--

CREATE TABLE IF NOT EXISTS `blocks_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idBlock` int(10) unsigned NOT NULL,
  `idPage` int(10) unsigned NOT NULL,
  `placeholder` varchar(20) NOT NULL,
  `params` varchar(255) DEFAULT NULL,
  `priority` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idBlock` (`idBlock`,`idPage`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `blocks_widgets`
--

CREATE TABLE IF NOT EXISTS `blocks_widgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idBlock` int(10) unsigned NOT NULL,
  `idWidget` int(10) unsigned NOT NULL,
  `view` varchar(255) NOT NULL,
  `params` varchar(255) DEFAULT NULL,
  `priority` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idPage` (`idBlock`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idParent` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `date_created` datetime NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idParent` (`idParent`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `components`
--

CREATE TABLE IF NOT EXISTS `components` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `controller` text NOT NULL,
  `action` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `items_parameters`
--

CREATE TABLE IF NOT EXISTS `items_parameters` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `items_parameters_options`
--

CREATE TABLE IF NOT EXISTS `items_parameters_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idParameter` int(10) unsigned NOT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idParameter` (`idParameter`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(500) NOT NULL,
  `controller` varchar(100) NOT NULL DEFAULT 'index',
  `action` varchar(100) NOT NULL DEFAULT 'index',
  `params` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `date_created` datetime NOT NULL,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `products_parameters`
--

CREATE TABLE IF NOT EXISTS `products_parameters` (
  `idProduct` int(11) NOT NULL,
  `idParameter` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  UNIQUE KEY `idProduct` (`idProduct`,`idParameter`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `users`
--
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` char(32) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `job` varchar(100) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `widgets`
--

CREATE TABLE IF NOT EXISTS `widgets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `controller` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `view` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
