CREATE DEFINER=`root`@`localhost` PROCEDURE `addFile`(
	IN 	testID INT,
		technician VARCHAR(30),
        model VARCHAR(20),
        meta VARCHAR(128),
        filepath VARCHAR(128))
BEGIN
	-- Issues to fix in the future:
    -- n/a
	INSERT INTO datastore (
		test_id,
        date_added,
        technician,
        model_id,
        meta_data,
        file_path)
	VALUE (
		testID,
        CURDATE(),
        technician,
        model,
        meta,
        filepath
    );
END