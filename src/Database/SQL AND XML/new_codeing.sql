

CREATE TABLE tbl_user (
 email VARCHAR(500) NOT NULL,
 password VARCHAR(5000) NOT NULL,
 full_name VARCHAR(500) NOT NULL,
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

CREATE TABLE tbl_app (
 id BIGSERIAL NOT NULL,
 app_desc VARCHAR(1000) NOT NULL,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR NOT NULL DEFAULT '500',
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP
);


ALTER TABLE tbl_app ADD CONSTRAINT tbl_app_pkey PRIMARY KEY (id);

CREATE TABLE tbl_work_flow (
 id BIGSERIAL NOT NULL,
 app_id_fk INTEGER NOT NULL,
 work_title VARCHAR(1000) NOT NULL,
 work_desc VARCHAR(1000) NOT NULL,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_work_flow ADD CONSTRAINT tbl_work_flow_pkey PRIMARY KEY (id);

CREATE TABLE tbl_fns (
 id BIGSERIAL NOT NULL,
 work_flow_id_fk INTEGER NOT NULL,
 fn_title VARCHAR(5000) NOT NULL,
 fn_slug VARCHAR(5000) NOT NULL,
 fn_type VARCHAR(1000) NOT NULL,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_fns ADD CONSTRAINT tbl_fns_pkey PRIMARY KEY (id);

CREATE TABLE tbl_fn_process (
 id BIGSERIAL NOT NULL,
 fns_id_fk INTEGER NOT NULL,
 process_title VARCHAR(50000) NOT NULL,
 process_slug VARCHAR(5000) NOT NULL,
 process_is_have_condition BOOLEAN NOT NULL DEFAULT 'false',
 process JSON NOT NULL,
 user_created VARCHAR(500),
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_fn_process ADD CONSTRAINT tbl_fn_process_pkey PRIMARY KEY (id);

CREATE TABLE tbl_vars (
 id BIGSERIAL,
 fns_id_fk INTEGER NOT NULL,
 var_title VARCHAR(500) NOT NULL,
 var_type VARCHAR(5000) NOT NULL,
 type VARCHAR(500) NOT NULL,
 path VARCHAR(3000) NOT NULL,
 value VARCHAR(50000) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_vars ADD CONSTRAINT tbl_vars_pkey PRIMARY KEY (id);

CREATE TABLE tbl_process_conditions (
 id BIGSERIAL NOT NULL,
 process_id_fk INTEGER NOT NULL,
 order_execut INTEGER NOT NULL,
 first_value JSON NOT NULL,
 signal VARCHAR(50) NOT NULL,
 second_value JSON NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_process_conditions ADD CONSTRAINT tbl_process_conditions_pkey PRIMARY KEY (id);

CREATE TABLE tbl_data_base (
 id BIGSERIAL NOT NULL,
 app_id_fk INTEGER NOT NULL,
 datname VARCHAR(5000) NOT NULL,
 datconnlimit INTEGER NOT NULL DEFAULT -1,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_data_base ADD CONSTRAINT tbl_data_base_pkey PRIMARY KEY (id);

CREATE TABLE tbl_table (
 id BIGSERIAL NOT NULL,
 schema_id_fk INTEGER NOT NULL,
 table_name VARCHAR(1000) NOT NULL,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_table ADD CONSTRAINT tbl_table_pkey PRIMARY KEY (id);

CREATE TABLE tbl_column (
 id BIGSERIAL NOT NULL,
 table_id_fk INTEGER NOT NULL,
 column_name VARCHAR(500) NOT NULL,
 column_default VARCHAR(20000),
 is_nullable VARCHAR NOT NULL DEFAULT 'YES',
 data_type VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_column ADD CONSTRAINT tbl_column_pkey PRIMARY KEY (id);

CREATE TABLE tbl_schema (
 id BIGSERIAL NOT NULL,
 data_base_id_fk INTEGER NOT NULL,
 schema_name VARCHAR(1000) NOT NULL,
 user_owner VARCHAR(500) NOT NULL,
 user_created VARCHAR(500) NOT NULL,
 created_at TIMESTAMP NOT NULL,
 user_updated VARCHAR(500) NOT NULL,
 updated_at TIMESTAMP NOT NULL
);


ALTER TABLE tbl_schema ADD CONSTRAINT tbl_schema_pkey PRIMARY KEY (id);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES tbl_type_user(id);
ALTER TABLE tblr_type_user_and_routes ADD CONSTRAINT tblr_type_user_and_routes_route_id_fkey FOREIGN KEY (route_id) REFERENCES tbl_routs(id);
ALTER TABLE tblr_type_user_and_routes ADD CONSTRAINT tblr_type_user_and_routes_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES tbl_type_user(id);
ALTER TABLE tbl_app ADD CONSTRAINT tbl_app_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_app ADD CONSTRAINT tbl_app_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_app ADD CONSTRAINT tbl_app_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_work_flow ADD CONSTRAINT tbl_work_flow_app_id_fk_fkey FOREIGN KEY (app_id_fk) REFERENCES tbl_app(id);
ALTER TABLE tbl_work_flow ADD CONSTRAINT tbl_work_flow_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_work_flow ADD CONSTRAINT tbl_work_flow_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_work_flow ADD CONSTRAINT tbl_work_flow_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_fns ADD CONSTRAINT tbl_fns_work_flow_id_fk_fkey FOREIGN KEY (work_flow_id_fk) REFERENCES tbl_work_flow(id);
ALTER TABLE tbl_fns ADD CONSTRAINT tbl_fns_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_fns ADD CONSTRAINT tbl_fns_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_fns ADD CONSTRAINT tbl_fns_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_fn_process ADD CONSTRAINT tbl_fn_process_fns_id_fk_fkey FOREIGN KEY (fns_id_fk) REFERENCES tbl_fns(id);
ALTER TABLE tbl_fn_process ADD CONSTRAINT tbl_fn_process_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_fn_process ADD CONSTRAINT tbl_fn_process_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_vars ADD CONSTRAINT tbl_vars_fns_id_fk_fkey FOREIGN KEY (fns_id_fk) REFERENCES tbl_fns(id);
ALTER TABLE tbl_vars ADD CONSTRAINT tbl_vars_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_vars ADD CONSTRAINT tbl_vars_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_process_conditions ADD CONSTRAINT tbl_process_conditions_process_id_fk_fkey FOREIGN KEY (process_id_fk) REFERENCES tbl_fn_process(id);
ALTER TABLE tbl_process_conditions ADD CONSTRAINT tbl_process_conditions_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_process_conditions ADD CONSTRAINT tbl_process_conditions_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_data_base ADD CONSTRAINT tbl_data_base_app_id_fk_fkey FOREIGN KEY (app_id_fk) REFERENCES tbl_app(id);
ALTER TABLE tbl_data_base ADD CONSTRAINT tbl_data_base_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_data_base ADD CONSTRAINT tbl_data_base_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_data_base ADD CONSTRAINT tbl_data_base_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_table ADD CONSTRAINT tbl_table_schema_id_fk_fkey FOREIGN KEY (schema_id_fk) REFERENCES tbl_schema(id);
ALTER TABLE tbl_table ADD CONSTRAINT tbl_table_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_table ADD CONSTRAINT tbl_table_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_table ADD CONSTRAINT tbl_table_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_column ADD CONSTRAINT tbl_column_table_id_fk_fkey FOREIGN KEY (table_id_fk) REFERENCES tbl_table(id);
ALTER TABLE tbl_column ADD CONSTRAINT tbl_column_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_column ADD CONSTRAINT tbl_column_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);
ALTER TABLE tbl_schema ADD CONSTRAINT tbl_schema_data_base_id_fk_fkey FOREIGN KEY (data_base_id_fk) REFERENCES tbl_data_base(id);
ALTER TABLE tbl_schema ADD CONSTRAINT tbl_schema_user_owner_fkey FOREIGN KEY (user_owner) REFERENCES tbl_user(email);
ALTER TABLE tbl_schema ADD CONSTRAINT tbl_schema_user_created_fkey FOREIGN KEY (user_created) REFERENCES tbl_user(email);
ALTER TABLE tbl_schema ADD CONSTRAINT tbl_schema_user_updated_fkey FOREIGN KEY (user_updated) REFERENCES tbl_user(email);








CREATE OR REPLACE VIEW view_data_base AS
	SELECT 

		a.id,
		b.data_base_id_fk,
		b.schema_name,
		a.table_name,
		a.user_owner,
		a.user_created,
		a.created_at,
		a.user_updated,
		a.updated_at

	FROM tbl_table a
	LEFT JOIN tbl_schema b ON a.schema_id_fk = b.id







CREATE OR REPLACE VIEW view_schema AS
  SELECT 
		a.*,
		b.datname
  FROM tbl_schema a
	LEFT JOIN tbl_data_base b ON b.id = data_base_id_fk ;



CREATE OR REPLACE VIEW view_table AS
  SELECT 
		a.*,
		b.schema_name,
		c.datname
  FROM tbl_table a
	LEFT JOIN tbl_schema b ON b.id = a.schema_id_fk 
	LEFT JOIN tbl_data_base c ON c.id = b.data_base_id_fk ;



	
CREATE OR REPLACE VIEW view_column AS
  SELECT 
		a.*,
		b.table_name,
		c.schema_name,
		d.datname
		
  FROM tbl_column a
	LEFT JOIN tbl_table b ON b.id = a.table_id_fk 
	LEFT JOIN tbl_schema c ON c.id = b.schema_id_fk 
	LEFT JOIN tbl_data_base d ON d.id = c.data_base_id_fk 


































-- SELECT 
-- 	datname,
-- 	*
-- FROM pg_database
-- where datname = 'railway';


-- SELECT * FROM information_schema.tables 







-- -- Usiarios 
-- SELECT * FROM pg_catalog.pg_user;

-- -- base de dasdos
-- SELECT 
-- 	oid,
-- 	datname,
-- 	datconnlimit
	
-- FROM pg_catalog.pg_database
-- 	where datname not in ('postgres', 'railway', 'template1', 'template0')
-- ;

-- -- Schemas 
-- SELECT * FROM information_schema.schemata;

-- -- Visualizações
-- SELECT * FROM pg_catalog.pg_views;

-- -- Tabela
-- SELECT * FROM pg_catalog.pg_tables;

-- -- Colunas
-- SELECT * FROM information_schema.columns;








-- DROP DATABASE IF EXISTS t10 WITH (FORCE)





















