create or replace procedure SP_SearchEmployeeByName(p_input      in varchar2,
                                                 p_input2     in varchar2,
                                                 p_returndata out sys_refcursor) is

  v_var varchar2(10) := 'Идэвхтэй';

begin

  dbms_output.put_line('Input : ' || p_input);
  open p_returnData for
  
    select EMPID, DEPID, DNAME, PNAME, HIREDDATE, EMPLOYEENAME, GENDER, STATUS
      from BI_HREMPLOYEE t
     where EMPLOYEENAME like '' || p_input || '%'
           and status = ''|| p_input2 ||'';
       --and status = v_var;
end;
/
