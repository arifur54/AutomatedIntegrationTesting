USE [integration_db]
GO
/****** Object:  Table [dbo].[Integrations]    Script Date: Mon 2022-04-04 23:31:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

DROP TABLE [dbo].[TestCases]
DROP TABLE [dbo].[Integrations]
DROP TABLE [dbo].[Users]

CREATE TABLE [dbo].[Integrations](
	[IntegrationId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Name] [varchar](20) NOT NULL,
	[Description] [varchar](200) NULL,
	[DateCreated] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IntegrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TestCases]    Script Date: Mon 2022-04-04 23:31:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestCases](
	[TestCaseId] [int] IDENTITY(1,1) NOT NULL,
	[IntegrationId] [int] NOT NULL,
	[Sequence] [int] NOT NULL,
	[Label] [varchar](20) NULL,
	[ElementId] [varchar](200) NULL,
	[ElementClass] [varchar](200) NULL,
	[ElementHref] [varchar](200) NULL,
	[ElementLinkText] [varchar](200) NULL,
	[Action] [varchar](50) NULL,
	[Value] [varchar](200) NULL,
	[isTransition] [bit] NULL,
	[isAssertion] [bit] NULL,
	[URL] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[TestCaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: Mon 2022-04-04 23:31:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](20) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [varchar](100) NOT NULL,
	[DateJoined] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[Users] ON 
INSERT [dbo].[Users] ([UserId],[Username], [FirstName], [LastName], [Email], [Password], [DateJoined]) VALUES (1, N'TestUser', N'Test', N'User', N'test@user.com', N'test', CAST(N'2022-04-04T20:38:07.673' AS DateTime))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO

SET IDENTITY_INSERT [dbo].[Integrations] ON 
INSERT [dbo].[Integrations] ([IntegrationId], [UserId], [Name], [Description], [DateCreated]) VALUES (1, 1, N'HPL Integration', N'Test functionality on HPL site', CAST(N'2022-04-04T20:39:04.803' AS DateTime))
SET IDENTITY_INSERT [dbo].[Integrations] OFF
GO

SET IDENTITY_INSERT [dbo].[TestCases] ON 
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (1, 1, 1, 		N'Go to site', 		N'my-hpl-text', NULL, 		N'Check Text', 	N'My HPL', 	0, 1, N'https://www.hpl.ca/', NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (2, 1, 2, 		N'Kids Tab', 		NULL, 			NULL, 		N'Click', 		NULL, 		1, 0, NULL, N'https://kids.hpl.ca', NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (3, 1, 3, 		N'Programs', 		NULL, 			NULL, 		N'Click', 		NULL, 		1, 0, NULL, N'https://events.hpl.ca/events?l=Virtual%20Branch,External%20Events&r=thismonth', NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (4, 1, 4, 		N'Event search', 	N'eventsearch', NULL, 		N'Input Text', 	N'Intro to Code and Art Online', 0, 0, NULL, NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (5, 1, 5, 		N'Confirm search', 	NULL, 			NULL, 		N'Element Exists', NULL, 		0, 1, NULL, N'event/6373293', NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (6, 1, 6, 		N'Go to search', 	NULL, 			NULL, 		N'Click', 		NULL, 		1, 0, NULL, N'http://www.hpl.ca/', NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (7, 1, 7, 		N'Search terms', 	N'search-keywords', NULL, 	N'Enter Text', 	N'Dune', 	0, 0, NULL, NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (8, 1, 8, 		N'Perform search', 	N'submit-search', NULL, 	N'Click', 		NULL, 		1, 0, NULL, NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (9, 1, 9, 		N'Go login', 		NULL, 			N'field_username', 	N'Enter Text', N'test@email.com', 1, 0, N'https://hpl.bibliocommons.com/user/login?destination=%2Fuser_dashboard', NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (10, 1, 10, 	N'Forgot PIN', 		NULL, 			NULL, 		N'Click', 		NULL, 		0, 0, NULL, N'/user/forgot', NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (11, 1, 11, 	N'Enter Barcode', 	N'barcode', 	NULL, 		N'Enter Text', 	N'123456', 	0, 0, NULL, NULL, NULL)
INSERT [dbo].[TestCases] ([TestCaseId], [IntegrationId], [Sequence], [Label], [ElementId], [ElementClass], [Action], [Value], [isTransition], [isAssertion], [URL], [ElementHref], [ElementLinkText]) VALUES (12, 1, 12, 	N'Click Send', 		N'submit_forgot', NULL, 	N'Click', 		NULL, 		0, 0, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TestCases] OFF
GO

ALTER TABLE [dbo].[TestCases] ADD  CONSTRAINT [DF_TestCases_ElementHref]  DEFAULT (NULL) FOR [ElementHref]
GO
ALTER TABLE [dbo].[Integrations]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[TestCases]  WITH CHECK ADD FOREIGN KEY([IntegrationId])
REFERENCES [dbo].[Integrations] ([IntegrationId])
GO
