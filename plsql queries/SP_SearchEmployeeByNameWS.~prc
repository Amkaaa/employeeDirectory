CREATE OR REPLACE PROCEDURE SP_SearchEmployeeByEmpname(p_in_empname IN varchar2,
                                                       p_in_status IN varchar2,
                                                       p_in_status2 IN varchar2,
                                                       p_returndata OUT sys_refcursor) 
IS
  --v_var varchar2(10) := '????????';

BEGIN

  dbms_output.put_line('Input : ' || p_input);
  OPEN p_returnData 
  FOR
    SELECT EMPID, DEPID, DNAME, PNAME, HIREDDATE, EMPLOYEENAME, GENDER, STATUS
      FROM BI_HREMPLOYEE t
     WHERE PHONE LIKE '' || p_in_empname || '%'
           AND (status = ''|| p_in_status ||'' OR status = ''||  p_in_status2 ||'');
END;
/
