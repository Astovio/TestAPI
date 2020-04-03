CREATE DEFINER=`root`@`localhost` PROCEDURE `patchTool`(
	IN Model VARCHAR(20),
    Descr VARCHAR(128),
    Brand VARCHAR(20),
    Type VARCHAR(30)
    )
BEGIN
	UPDATE tools
    SET
		description = COALESCE(Descr, description),
        brand = COALESCE(Brand, brand),
        tool_type = COALESCE(Type, tool_type)
	WHERE model_id = Model;
END