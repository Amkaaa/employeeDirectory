select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       GNAME, 
       EMPTYPE, 
       HIREDDATE, 
       EMPLOYEENAME, 
       BIRTHDATE,
       EMAIL,
       EMAIL2,
       STATUSDATE,
       GENDER
       from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй'; --DEPID = '' and



-- hailtand garch ireh ajilchid JOIN
SELECT dep.depid, dep.name, dep.deptypeid, 
FROM TBLDEPARTMENT dep
INNER JOIN BI_HREMPLOYEE emp
ON dep.depid = emp.depid
WHERE dep.isactive = 'Y' and dep.deptypeid = 3;
where ISACTIVE = 'Y' and DEPTYPEID = '3'  or DEPTYPEID = '6'  or DEPTYPEID = '5'
ORDER BY DEPTYPEID
--subquery
SELECT empid,
       depid,
       dname, 
       pname, 
       emptype, 
       hireddate, 
       familyname, 
       employeename, 
       gender, 
       birthdate, 
       mobilephone,
       email,
       status
FROM BI_HREMPLOYEE emp
WHERE (status = (n'Идэвхтэй') or status = (n'Түр Эзгүй')) and depid = ?

------------------------

SELECT employeename, 
       empid,
       hireddate, 
       depid, 
       pname, 
       emptype, 
       gender,
       mobilephone,
       email,
       dname
       
   FROM BI_HREMPLOYEE t
   Where TO_DATE(t.HIREDDATE, 'YYYY-MM-DD') >= (SELECT SYSDATE - INTERVAL '9' MONTH FROM DUAL) AND  STATUS = n'Идэвхтэй' 
   Order By employeename;
   
-------------------------- Happy birthday
   
SELECT employeename, 
       empid, 
       depid, 
       dname,
       pname,
       gender,
       birthdate,
       email, status
FROM BI_HREMPLOYEE t
WHERE STATUS = n'Идэвхтэй' 
AND EXTRACT( DAY FROM TO_DATE( birthdate,  'DD-Mon-YYYY' )) IN (Select TO_CHAR(sysdate, 'DD') from dual) 
AND EXTRACT( MONTH FROM TO_DATE( birthdate,  'DD-Mon-YYYY' )) IN (Select TO_CHAR(sysdate, 'MM') from dual) 


------------------------------

SELECT employeename, 
       empid,
       mobilephone,
       dname,
       pname
FROM BI_HREMPLOYEE 
Where status = N'Ажлаас Гарсан' and 
      Statusdate >= (SELECT SYSDATE - INTERVAL '1' YEAR FROM DUAL)
Order By statusdate desc;

--------------------------------
--------------------------------
---------------------------------
select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and MOBILEPHONE like '?%' ;

select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and EMPLOYEENAME like n'Ган%' ;

select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
       SELECT *
       from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and EMPLOYEENAME = CONCAT(N'Ган','%');
       
select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
       from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and EMAIL like 'b%' ;

select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and PNAME like '?%' ;

select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and DNAME like '?%' ;

select EMPID, 
       DEPID, 
       DNAME, 
       PNAME, 
       HIREDDATE, 
       EMPLOYEENAME,
       GENDER
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй' and (DNAME like '?%' or 
                                 PNAME like '?%' or
                                 (? is not null and EMAIL like '?%') or
                                 EMPLOYEENAME like '?%' or
                                 MOBILEPHONE like '?%') ;
