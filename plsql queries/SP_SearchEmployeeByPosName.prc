﻿CREATE OR REPLACE PROCEDURE SP_SearchEmployeeByPosName(p_in_pname IN varchar2,
                                                       p_in_status IN varchar2,
                                                       p_in_status2 IN varchar2,
                                                       p_returndata OUT sys_refcursor) 
IS BEGIN

  dbms_output.put_line('Input : ' || p_in_pname);
  OPEN p_returnData 
  FOR
    SELECT EMPID, DEPID, DNAME, LOWER(PNAME) as PNAME, HIREDDATE, EMPLOYEENAME, GENDER, STATUS, MOBILEPHONE, EMAIL
      FROM BI_HREMPLOYEE t
     WHERE LOWER(PNAME) LIKE '' || p_in_pname || '%'
           AND (status = ''|| p_in_status ||'' OR status = ''||  p_in_status2 ||'');
END;
/
