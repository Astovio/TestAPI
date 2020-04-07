-- Create a procedure to search through the database with given criteria
CREATE DEFINER=`root`@`localhost` PROCEDURE `searchSQL`(
	IN brandname VARCHAR(20),
       producttype VARCHAR(30),
       TRnumber VARCHAR(10),
       model VARCHAR(20))
BEGIN
	SELECT * FROM tools
    INNER JOIN test
    INNER JOIN files
    WHERE 
    (brandname IS NULL OR tools.brand = brandname)
    AND (producttype IS NULL OR tools.tool_type = producttype)
    AND (TRnumber IS NULL OR test.tr_id = TRnumber)
    AND (model IS NULL OR tools.model_id = model)
    AND tools.model_id = files.model_id
    AND test.test_id = files.test_id;
END