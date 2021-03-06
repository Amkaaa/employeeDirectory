﻿CREATE OR REPLACE PROCEDURE SP_SearchEmployeeByName(p_in_name IN varchar2,
                                                    p_in_status IN varchar2,
                                                    p_in_status2 IN varchar2,
                                                    p_returndata OUT sys_refcursor) 
IS BEGIN

  dbms_output.put_line('Input : ' || p_in_name);
  OPEN p_returnData 
  FOR
    SELECT EMPID, DEPID, DNAME, PNAME, HIREDDATE, employeename, GENDER, STATUS, MOBILEPHONE, EMAIL
      FROM BI_HREMPLOYEE t
     WHERE LOWER(EMPLOYEENAME) LIKE '' || p_in_name || '%'
           AND (status = ''|| p_in_status ||'' OR status = ''||  p_in_status2 ||'');
END;
/
