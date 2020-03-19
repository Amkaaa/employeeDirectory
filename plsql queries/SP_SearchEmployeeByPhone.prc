CREATE OR REPLACE PROCEDURE SP_SearchEmployeeByPhone(p_in_phone IN varchar2,
                                                     p_in_status IN varchar2,
                                                     p_in_status2 IN varchar2,
                                                     p_returndata OUT sys_refcursor) 
IS BEGIN

  dbms_output.put_line('Input : ' || p_in_phone);
  OPEN p_returnData 
  FOR
    SELECT EMPID, DEPID, DNAME, PNAME, HIREDDATE, EMPLOYEENAME, GENDER, STATUS, MOBILEPHONE, EMAIL
      FROM BI_HREMPLOYEE t
     WHERE MOBILEPHONE LIKE '' || p_in_phone || '%'
           AND (status = ''|| p_in_status ||'' OR status = ''||  p_in_status2 ||'');
END;
/
