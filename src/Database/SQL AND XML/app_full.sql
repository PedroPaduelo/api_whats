CREATE TABLE tbl_user (
 email VARCHAR(500) NOT NULL,
 password VARCHAR(50000) NOT NULL,
 full_name VARCHAR(5000) NOT NULL,
 fist_name VARCHAR(500) NOT NULL,
 last_name VARCHAR(500) NOT NULL,
 photo_file VARCHAR(10000),
 fisrt_access INTEGER NOT NULL DEFAULT 1,
 token VARCHAR(50000),
 user_type_id INTEGER NOT NULL,
 created_at TIMESTAMP NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_pkey PRIMARY KEY (email);

CREATE TABLE tbl_type_user (
 id BIGSERIAL NOT NULL,
 description VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_type_user ADD CONSTRAINT tbl_type_user_pkey PRIMARY KEY (id);

CREATE TABLE tbl_routs (
 id BIGSERIAL NOT NULL,
 path VARCHAR(20000) NOT NULL,
 description VARCHAR(5000) NOT NULL,
 component VARCHAR(500) NOT NULL,
 icon VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_routs ADD CONSTRAINT tbl_routs_pkey PRIMARY KEY (id);

CREATE TABLE tblr_type_user_and_routes (
 route_id INTEGER NOT NULL,
 user_type_id INTEGER NOT NULL
);


ALTER TABLE tblr_type_user_and_routes ADD CONSTRAINT tblr_type_user_and_routes_pkey PRIMARY KEY (route_id, user_type_id);

CREATE TABLE tbl_aplication (
 id BIGSERIAL NOT NULL,
 aplication_link VARCHAR(500) NOT NULL,
 aplication_title VARCHAR(500) NOT NULL,
 aplication_descripiton VARCHAR(50000) NOT NULL,
 aplication_previw VARCHAR(50000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_aplication ADD CONSTRAINT tbl_aplication_pkey PRIMARY KEY (id);

CREATE TABLE tbl_prof_lesson (
 id BIGSERIAL NOT NULL,
 subject VARCHAR(5000) NOT NULL,
 cost DECIMAL,
 plans_lesson VARCHAR(500000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_prof_lesson ADD CONSTRAINT tbl_prof_lesson_pkey PRIMARY KEY (id);

CREATE TABLE tbl_prof_hour_lesson (
 id BIGSERIAL NOT NULL,
 week_day INTEGER NOT NULL,
 from_at INTEGER NOT NULL,
 to_at INTEGER NOT NULL,
 id_lesson INTEGER NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_prof_hour_lesson ADD CONSTRAINT tbl_prof_hour_lesson_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_fns (
 id BIGSERIAL NOT NULL,
 fn_title VARCHAR(5000) NOT NULL,
 id_fn_type INTEGER NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_fns ADD CONSTRAINT tbl_olimpo_fns_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_fn_process (
 id BIGSERIAL NOT NULL,
 id_fn INTEGER NOT NULL,
 fn_process_title VARCHAR(5000) NOT NULL,
 fn_process_slug VARCHAR(5000) NOT NULL,
 id_process_type INTEGER NOT NULL,
 fn_process_has_conditions BOOLEAN NOT NULL DEFAULT 'False',
 id_process_conditions INTEGER,
 created_at INTEGER,
 updated_at INTEGER,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_fn_type (
 id BIGSERIAL NOT NULL,
 fn_type_descr VARCHAR(5000) NOT NULL,
 fn_type VARCHAR(5000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_fn_type ADD CONSTRAINT tbl_olimpo_fn_type_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_type_process (
 id BIGSERIAL NOT NULL,
 type_process_descr VARCHAR(5000) NOT NULL,
 type_process VARCHAR(5000) NOT NULL,
 id_fn_type INTEGER NOT NULL,
 created_at DATE,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_type_process ADD CONSTRAINT tbl_olimpo_type_process_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_process_conditions (
 id BIGSERIAL NOT NULL,
 value_1 VARCHAR(5000) NOT NULL,
 value_2 VARCHAR(5000) NOT NULL,
 comparator VARCHAR(5000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_process_conditions ADD CONSTRAINT tbl_olimpo_process_conditions_pkey PRIMARY KEY (id);

CREATE TABLE tbl_olimpo_fn_inputs (
 id BIGSERIAL NOT NULL,
 id_fn INTEGER NOT NULL,
 fn_input_type VARCHAR(5000) NOT NULL,
 fn_input_path VARCHAR(5000),
 value VARCHAR(5000),
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 user_updated VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_olimpo_fn_inputs ADD CONSTRAINT tbl_olimpo_fn_inputs_pkey PRIMARY KEY (id);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES tbl_type_user(id);
ALTER TABLE tblr_type_user_and_routes ADD CONSTRAINT tblr_type_user_and_routes_route_id_fkey FOREIGN KEY (route_id) REFERENCES tbl_routs(id);
ALTER TABLE tblr_type_user_and_routes ADD CONSTRAINT tblr_type_user_and_routes_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES tbl_type_user(id);
ALTER TABLE tbl_aplication ADD CONSTRAINT tbl_aplication_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_aplication ADD CONSTRAINT tbl_aplication_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_prof_lesson ADD CONSTRAINT tbl_prof_lesson_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_prof_lesson ADD CONSTRAINT tbl_prof_lesson_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_prof_hour_lesson ADD CONSTRAINT tbl_prof_hour_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES tbl_prof_lesson(id);
ALTER TABLE tbl_prof_hour_lesson ADD CONSTRAINT tbl_prof_hour_lesson_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_prof_hour_lesson ADD CONSTRAINT tbl_prof_hour_lesson_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fns ADD CONSTRAINT tbl_olimpo_fns_id_fn_type_fkey FOREIGN KEY (id_fn_type) REFERENCES tbl_olimpo_fn_type(id);
ALTER TABLE tbl_olimpo_fns ADD CONSTRAINT tbl_olimpo_fns_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fns ADD CONSTRAINT tbl_olimpo_fns_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_id_fn_fkey FOREIGN KEY (id_fn) REFERENCES tbl_olimpo_fns(id);
ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_id_process_type_fkey FOREIGN KEY (id_process_type) REFERENCES tbl_olimpo_type_process(id);
ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_id_process_conditions_fkey FOREIGN KEY (id_process_conditions) REFERENCES tbl_olimpo_process_conditions(id);
ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_process ADD CONSTRAINT tbl_olimpo_fn_process_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_type ADD CONSTRAINT tbl_olimpo_fn_type_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_type ADD CONSTRAINT tbl_olimpo_fn_type_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_type_process ADD CONSTRAINT tbl_olimpo_type_process_id_fn_type_fkey FOREIGN KEY (id_fn_type) REFERENCES tbl_olimpo_fn_type(id);
ALTER TABLE tbl_olimpo_type_process ADD CONSTRAINT tbl_olimpo_type_process_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_type_process ADD CONSTRAINT tbl_olimpo_type_process_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_process_conditions ADD CONSTRAINT tbl_olimpo_process_conditions_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_process_conditions ADD CONSTRAINT tbl_olimpo_process_conditions_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_inputs ADD CONSTRAINT tbl_olimpo_fn_inputs_id_fn_fkey FOREIGN KEY (id_fn) REFERENCES tbl_olimpo_fns(id);
ALTER TABLE tbl_olimpo_fn_inputs ADD CONSTRAINT tbl_olimpo_fn_inputs_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_olimpo_fn_inputs ADD CONSTRAINT tbl_olimpo_fn_inputs_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);














INSERT INTO public.tbl_type_user(
	id, description, created_at, updated_at)
	VALUES 	(1, 'ADM', '09/13/2022', '09/13/2022'),
			    (2, 'Others', '09/13/2022', '09/13/2022')
;


INSERT INTO public.tbl_routs(
	id, path, description, component, icon, created_at, updated_at)
	VALUES 	(1, '/Olympo/Bd', 'Banco de dados', 'BancoDeDados', 'BancoDeDados', '09/13/2022', '09/13/2022'),
			    (2, '/Olympo/wkf', 'Work Flow', 'WorkingFlow', 'AccountTree', '09/13/2022', '09/13/2022')
;


INSERT INTO public.tblr_type_user_and_routes(
	route_id, user_type_id)
	VALUES 	(1, 1),
			    (1, 2),
					(2, 1),
					(2, 2)
;





-- INSERT INTO public.tbl_aplication(
-- 	id, aplication_link, aplication_title, aplication_descripiton, aplication_previw, created_at, updated_at, user_created, user_updated)
-- 	VALUES 	(1, '//Bd', 'Banco de dados', 'BancoDeDados', 'BancoDeDados', '13/09/2022', '13/09/2022'),
-- 			    (2, '/Olympo/wkf', 'Work Flow', 'WorkingFlow', 'AccountTree', '13/09/2022', '13/09/2022')
-- ;










-- Usiarios 
SELECT * FROM pg_catalog.pg_user;

-- base de dasdos
SELECT * FROM pg_catalog.pg_database;

-- Schemas 
SELECT * FROM information_schema.schemata;

-- Visualizações
SELECT * FROM pg_catalog.pg_views;

-- Tabela
SELECT * FROM pg_catalog.pg_tables;

-- Colunas
SELECT * FROM information_schema.columns;












