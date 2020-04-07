CREATE DEFINER=`root`@`localhost` PROCEDURE `patchTest`(
	IN 
    ID INT,
    TR VARCHAR(10),
    Doc VARCHAR(30), 
    Sec VARCHAR(10)
    )
BEGIN
	UPDATE test
    SET
		tr_id = COALESCE(TR, tr_id),
        ref_doc = COALESCE(Doc, ref_doc),
        doc_sec = COALESCE(Sec, doc_sec)
	WHERE test_id = ID;
END