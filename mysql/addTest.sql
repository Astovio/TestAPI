CREATE DEFINER=`root`@`localhost` PROCEDURE `addTest`(
	IN 	TRnumber VARCHAR(10),
		document VARCHAR(30),
        section VARCHAR(10))
BEGIN
	-- Issues to fix in the future:
    -- Handle null values for TR#
	INSERT INTO test (
		tr_id,
        ref_doc,
        doc_sec)
	VALUE (
		TRnumber,
        document,
        section
    );
END