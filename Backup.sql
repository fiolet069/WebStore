--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CustomerInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerInfo" (
    "Id" integer NOT NULL,
    "Name" character varying(30) NOT NULL,
    "Surname" character varying(30) NOT NULL,
    "Balance" real DEFAULT 0.0
);


ALTER TABLE public."CustomerInfo" OWNER TO postgres;

--
-- Name: CustomerInfo_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CustomerInfo_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CustomerInfo_Id_seq" OWNER TO postgres;

--
-- Name: CustomerInfo_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CustomerInfo_Id_seq" OWNED BY public."CustomerInfo"."Id";


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    "Id" integer NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Cost" real NOT NULL,
    "Amount" integer NOT NULL,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductProperty" (
    "Id" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Value" character varying(50) NOT NULL,
    "ProductId" integer NOT NULL
);


ALTER TABLE public."ProductProperty" OWNER TO postgres;

--
-- Name: ProductProperty_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductProperty_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProductProperty_Id_seq" OWNER TO postgres;

--
-- Name: ProductProperty_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductProperty_Id_seq" OWNED BY public."ProductProperty"."Id";


--
-- Name: Product_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_Id_seq" OWNER TO postgres;

--
-- Name: Product_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_Id_seq" OWNED BY public."Product"."Id";


--
-- Name: Purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Purchase" (
    "Id" integer NOT NULL,
    "DateAndTime" timestamp without time zone NOT NULL,
    "UserId" integer NOT NULL
);


ALTER TABLE public."Purchase" OWNER TO postgres;

--
-- Name: Purchase_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Purchase_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Purchase_Id_seq" OWNER TO postgres;

--
-- Name: Purchase_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Purchase_Id_seq" OWNED BY public."Purchase"."Id";


--
-- Name: Purchase_Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Purchase_Product" (
    "PurchaseId" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "ProductAmount" integer NOT NULL
);


ALTER TABLE public."Purchase_Product" OWNER TO postgres;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    "Id" integer NOT NULL,
    "Name" character varying(10) NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Roles_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Roles_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_Id_seq" OWNER TO postgres;

--
-- Name: Roles_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_Id_seq" OWNED BY public."Role"."Id";


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "Id" integer NOT NULL,
    "Email" character varying(50) NOT NULL,
    "Password" character varying(50) NOT NULL,
    "RoleId" integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_Id_seq" OWNER TO postgres;

--
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_Id_seq" OWNED BY public."User"."Id";


--
-- Name: CustomerInfo Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInfo" ALTER COLUMN "Id" SET DEFAULT nextval('public."CustomerInfo_Id_seq"'::regclass);


--
-- Name: Product Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN "Id" SET DEFAULT nextval('public."Product_Id_seq"'::regclass);


--
-- Name: ProductProperty Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductProperty" ALTER COLUMN "Id" SET DEFAULT nextval('public."ProductProperty_Id_seq"'::regclass);


--
-- Name: Purchase Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase" ALTER COLUMN "Id" SET DEFAULT nextval('public."Purchase_Id_seq"'::regclass);


--
-- Name: Role Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN "Id" SET DEFAULT nextval('public."Roles_Id_seq"'::regclass);


--
-- Name: User Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN "Id" SET DEFAULT nextval('public."User_Id_seq"'::regclass);


--
-- Data for Name: CustomerInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInfo" ("Id", "Name", "Surname", "Balance") FROM stdin;
4	Сергей	Семёнов 	479000
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" ("Id", "Name", "Cost", "Amount", "IsActive") FROM stdin;
3	Ноутбук\n	50000	100	t
4	Сотовый телефон\n	25000	100	t
5	Холодильник	45000	50	t
2	Телевизор	65000	50	t
1	Колонки	5000	100	t
\.


--
-- Data for Name: ProductProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductProperty" ("Id", "Name", "Value", "ProductId") FROM stdin;
5	Диагональ экрана	14"	3
6	Емкость аккумулятора	3000 — 4000 мAч	4
7	Процессор	Apple A12 Bionic	4
8	Общий полезный объем	45 л	5
3	Цифровые тюнеры	DVB-T2, DVB-S2, DVB-C	2
4	Разрешение экрана	HD, 1366x768	2
1	Мощность	160 Вт	1
2	Беспроводные подключения	Bluetooth	1
\.


--
-- Data for Name: Purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Purchase" ("Id", "DateAndTime", "UserId") FROM stdin;
1	2019-10-31 11:42:27.55741	4
2	2019-10-31 11:47:37.780194	4
3	2019-10-31 11:48:16.564605	4
4	2019-10-31 11:55:52.062006	4
5	2019-10-31 12:00:31.477507	4
6	2019-10-31 12:00:44.029605	4
7	2019-10-31 12:05:53.698229	4
8	2019-10-31 22:11:22.079463	4
\.


--
-- Data for Name: Purchase_Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Purchase_Product" ("PurchaseId", "ProductId", "ProductAmount") FROM stdin;
1	4	3
1	3	1
2	3	1
3	3	1
4	3	1
5	3	1
6	3	3
6	5	2
7	2	2
8	1	1
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" ("Id", "Name") FROM stdin;
1	Admin
2	Seller
3	Customer
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("Id", "Email", "Password", "RoleId") FROM stdin;
1	admin@gmail.com	qwerty	1
4	customer@gmail.com	qwerty	3
5	seller@gmail.com	qwerty	2
\.


--
-- Name: CustomerInfo_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CustomerInfo_Id_seq"', 2, true);


--
-- Name: ProductProperty_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductProperty_Id_seq"', 8, true);


--
-- Name: Product_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_Id_seq"', 5, true);


--
-- Name: Purchase_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Purchase_Id_seq"', 8, true);


--
-- Name: Roles_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_Id_seq"', 3, true);


--
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_Id_seq"', 6, true);


--
-- Name: CustomerInfo CustomerInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInfo"
    ADD CONSTRAINT "CustomerInfo_pkey" PRIMARY KEY ("Id");


--
-- Name: ProductProperty ProductProperty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductProperty"
    ADD CONSTRAINT "ProductProperty_pkey" PRIMARY KEY ("Id");


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("Id");


--
-- Name: Purchase_Product Purchase_Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase_Product"
    ADD CONSTRAINT "Purchase_Product_pkey" PRIMARY KEY ("PurchaseId", "ProductId");


--
-- Name: Purchase Purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Id");


--
-- Name: Role Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("Id");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- Name: CustomerInfo CustomerInfo_Id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInfo"
    ADD CONSTRAINT "CustomerInfo_Id_fkey" FOREIGN KEY ("Id") REFERENCES public."User"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductProperty ProductProperty_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductProperty"
    ADD CONSTRAINT "ProductProperty_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES public."Product"("Id");


--
-- Name: Purchase_Product Purchase_Product_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase_Product"
    ADD CONSTRAINT "Purchase_Product_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES public."Product"("Id");


--
-- Name: Purchase_Product Purchase_Product_PurchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase_Product"
    ADD CONSTRAINT "Purchase_Product_PurchaseId_fkey" FOREIGN KEY ("PurchaseId") REFERENCES public."Purchase"("Id");


--
-- Name: Purchase Purchase_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");


--
-- Name: User User_RoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Role"("Id");


--
-- PostgreSQL database dump complete
--

