--
-- Baza danych: `CMS` - DANE
--
-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks`
--

INSERT INTO `blocks` (`id`, `name`) VALUES
(1, 'left column'),
(2, 'right column');

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks_pages`
--

INSERT INTO `blocks_pages` (`id`, `idBlock`, `idPage`, `placeholder`, `params`, `priority`) VALUES
(1, 1, 1, 'left_col', NULL, 0),
(2, 1, 1, 'right_col', NULL, 0);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `blocks_widgets`
--

INSERT INTO `blocks_widgets` (`id`, `idBlock`, `idWidget`, `view`, `params`, `priority`) VALUES
(1, 1, 3, 'widgetLorem', NULL, 1),
(2, 1, 4, 'widgetUserbox', NULL, 0),
(3, 1, 2, 'widgetWidgets', NULL, 2),
(4, 2, 1, 'widgetPages', NULL, 0),
(5, 2, 3, 'widgetLorem', 'a:2:{s:6:"param1";s:4:"lorem";s:6:"param2";s:3:"ipsum";}', 1);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `components`
--

INSERT INTO `components` (`id`, `name`, `controller`, `action`) VALUES
(1, 'Lorem Ipsum', 'index', 'test');

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `pages`
--

INSERT INTO `pages` (`id`, `path`, `controller`, `action`, `params`) VALUES
(1, '/', 'index', 'test', NULL),
(2, 'test/', 'index', 'test', NULL);

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'admin', MD5('admin'));

-- --------------------------------------------------------
--
-- Zrzut danych tabeli `widgets`
--

INSERT INTO `widgets` (`id`, `name`, `controller`, `action`, `view`) VALUES
(1, 'Pages', 'pages', 'pages', 'widgetPages'),
(2, 'Widgets', 'widgets', 'widgets', 'widgetWidgets'),
(3, 'Lorem Ipsum', 'lorem', 'lorem', 'widgetLorem'),
(4, 'Userbox', 'userbox', 'userbox', 'widgetUserbox');
