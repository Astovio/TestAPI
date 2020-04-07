-- Create and use a database named 'testdata'
CREATE DATABASE testdata;
USE testdata;

-- This table will list all the different tools, along with their brand names and tool type.
CREATE TABLE tools(
    model_id VARCHAR(20) PRIMARY KEY,
    description VARCHAR(128),
    brand VARCHAR(20),
    tool_type VARCHAR(30)
);

-- This table will associate kits with model #'s
CREATE TABLE kits(
    kit_id VARCHAR(10),
    model_id VARCHAR(10),
    PRIMARY KEY (kit_id, model_id),
    FOREIGN KEY (model_id) REFERENCES tools(model_id) ON DELETE CASCADE
);

-- This table will list every individual test.
-- add FOREIGN KEY(tr_id) REFERENCES [existing tr table] ON DELETE CASCADE
CREATE TABLE test(
    test_id INT NOT NULL AUTO_INCREMENT, -- unique surrogate ID
    tr_id VARCHAR(10) NOT NULL, -- Test Request number
    ref_doc VARCHAR(30), -- Reference document
    doc_sec VARCHAR(10), -- Section of reference document that describes the test
    PRIMARY KEY (test_id),
    CONSTRAINT test_elements UNIQUE (tr_id,ref_doc,doc_sec) -- at least 1 of these columns needs to be different
);

-- This table will list all of the individual files available on the server.
CREATE TABLE files(
    file_id INT AUTO_INCREMENT, -- unique surrogate ID - is NOT related to # files associated with a single test
    test_id INT NOT NULL, -- link to test table
    date_added DATE, -- Date uploaded
    technician VARCHAR(30), -- Technician who ran the test. Should point to existing employee DB if possible
    model_id VARCHAR(20), -- model number - points to tools table
    meta_data VARCHAR(128),  -- We may want to look at this data type. Possibly break it up
                             -- into individual fields? What info do we actually want?
    file_path VARCHAR(128),  -- Is this going to be long enough?
    PRIMARY KEY (file_id),
    FOREIGN KEY (model_id) REFERENCES tools(model_id) ON DELETE SET NULL,
    FOREIGN KEY (test_id) REFERENCES test(test_id) ON DELETE CASCADE
        -- ON DELETE: If the TR or individual test disappears, do we want the data store
        -- to disappear? NOTE: this will not directly delete the files, just their place
        -- in the database.
);
