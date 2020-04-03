CREATE DEFINER=`root`@`localhost` PROCEDURE `getTestID`(
	IN 	TRnumber VARCHAR(10),
		document VARCHAR(30),
        section VARCHAR(10))
BEGIN
	SELECT test_id FROM test
    WHERE 
    (TRnumber IS NULL OR tr_id = TRnumber)
    AND (document IS NULL OR ref_doc = document)
    AND (section IS NULL OR doc_sec = section);
END