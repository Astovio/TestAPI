CREATE DEFINER=`root`@`localhost` PROCEDURE `patchFile`(
	IN 
    fileID INT,
    testID INT,
    Tech VARCHAR(30),
    Model VARCHAR(20), 
    Meta VARCHAR(128),
    Path VARCHAR (128)
    )
BEGIN
	UPDATE test
    SET
        test_id = COALESCE(testID, test_id),
        technician = COALESCE(Tech, technician),
        model_id = COALESCE(Model, model_id),
        meta_data = COALESCE(Meta, meta_data),
        file_path = COALESCE(Path, file_path)
	WHERE file_id = fileID;
END