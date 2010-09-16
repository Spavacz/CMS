--
-- Baza danych: `CMS` - DANE
--
-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks`
--

INSERT INTO `blocks` (`id`, `name`) VALUES
(1, 'left column'),
(2, 'right column'),
(3, 'Tests Block');

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks_pages`
--

INSERT INTO `blocks_pages` (`id`, `idBlock`, `idPage`, `placeholder`, `params`, `priority`) VALUES
(1, 1, 1, 'left_col', NULL, 0),
(2, 2, 1, 'right_col', NULL, 0),
(3, 3, 2, 'left_col', NULL, 0),
(4, 3, 3, 'left_col', NULL, 0);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks_widgets`
--

INSERT INTO `blocks_widgets` (`id`, `idBlock`, `idWidget`, `view`, `params`, `priority`) VALUES
(1, 1, 3, 'widgetLorem', NULL, 1),
(2, 1, 4, 'widgetUserbox', NULL, 0),
(3, 1, 2, 'widgetWidgets', NULL, 2),
(4, 2, 1, 'widgetPages', NULL, 0),
(5, 2, 3, 'widgetLorem', 'a:2:{s:6:"param1";s:4:"lorem";s:6:"param2";s:3:"ipsum";}', 1),
(6, 3, 5, 'widgetTests', NULL, 0);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `idParent`, `name`, `description`, `date_created`, `status`) VALUES
(1, 0, 'Main Category One', 'Description of Main Category One', NOW(), 1),
(2, 0, 'Main Category Two', 'Description of Main Category Two', NOW(), 1);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `components`
--

INSERT INTO `components` (`id`, `name`, `controller`, `action`) VALUES
(1, 'Lorem Ipsum', 'index', 'test');


-- --------------------------------------------------------
--
-- Zrzut danych tabeli `items_parameters`
--

INSERT INTO `items_parameters` (`id`, `type`, `name`, `description`) VALUES
(1, 'Checkbox', 'Parameter One', 'Description for Parameter One'),
(2, 'Selectbox', 'Parameter Two', 'Description for Parameter Two'),
(3, 'Checkbox', 'Parameter Three', 'Description for Parameter Three');

-- --------------------------------------------------------

--
-- Zrzut danych tabeli `items_parameters_options`
--

INSERT INTO `items_parameters_options` (`id`, `idParameter`, `value`) VALUES
(1, 1, 'Option One'),
(2, 1, 'Option Two');

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `pages`
--

INSERT INTO `pages` (`id`, `label`, `uri`, `controller`, `action`, `params`) VALUES
(1, 'Home', '/', 'index', 'index', NULL),
(2, 'Tests', 'test/', 'test', 'index', NULL),
(3, 'REST Tests', 'test/rest-products/', 'test', 'rest-products', NULL);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `date_created`, `status`) VALUES
(1, 'Product One', 'Description for Product One', NOW(), 1),
(2, 'Product Two', 'Description for Product Two', NOW(), 1);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `products_parameters`
--

INSERT INTO `products_parameters` (`idProduct`, `idParameter`, `value`) VALUES
(1, 1, '1'),
(1, 2, '2');

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `surname`, `phone`, `job`, `photo`, `description`, `status`) VALUES
(1, 'admin@cms.com', MD5('admin'), 'Administrator', '', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `widgets`
--

INSERT INTO `widgets` (`id`, `name`, `controller`, `action`, `view`) VALUES
(1, 'Pages', 'pages', 'pages', 'widgetPages'),
(2, 'Widgets', 'widgets', 'widgets', 'widgetWidgets'),
(3, 'Lorem Ipsum', 'lorem', 'lorem', 'widgetLorem'),
(4, 'Userbox', 'userbox', 'userbox', 'widgetUserbox'),
(5, 'Tests', 'tests', 'tests', 'widgetTests');
