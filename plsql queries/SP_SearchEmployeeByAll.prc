CREATE OR REPLACE PROCEDURE SP_SearchEmployeeByAll (p_in_all IN varchar2,
                                                    p_in_status IN varchar2,
                                                    p_in_status2 IN varchar2,
                                                    p_returndata OUT sys_refcursor) 
IS BEGIN

  dbms_output.put_line('Input : ' || p_in_all);
  OPEN p_returnData 
  FOR
    SELECT EMPID, DEPID, DNAME, PNAME, HIREDDATE, employeename, GENDER, STATUS, MOBILEPHONE, EMAIL
      FROM BI_HREMPLOYEE t
     WHERE (''|| p_in_all ||'' is not null and  LOWER(EMPLOYEENAME) LIKE '' || p_in_all || '%') or
           (''|| p_in_all ||'' is not null and  MOBILEPHONE LIKE '' || p_in_all || '%') or
           (''|| p_in_all ||'' is not null and  LOWER(DNAME) LIKE '' || p_in_all || '%') or
           (''|| p_in_all ||'' is not null and  LOWER(EMAIL) LIKE '' || p_in_all || '%') or
           (''|| p_in_all ||'' is not null and  LOWER(PNAME) LIKE '' || p_in_all || '%')
           AND (status = ''|| p_in_status ||'' OR status = ''||  p_in_status2 ||'');
END;
/
