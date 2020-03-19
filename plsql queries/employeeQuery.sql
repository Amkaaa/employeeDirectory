-- salbar, tootsoonii tuv
select DEPID, NAME, DEPTYPEID from TBLDEPARTMENT t
where ISACTIVE = 'Y' and DEPTYPEID = '3'
order by name asc;
-- heltes
select DEPID, DEPTYPEID , NAME from TBLDEPARTMENT t
where --ISACTIVE = 'Y' and 
      DEPTYPEID = '6';
-- Gazar
select DEPID, NAME, DEPTYPEID from TBLDEPARTMENT t
where --ISACTIVE = 'Y' and 
      DEPTYPEID = '5'
-- Alba --???
select * from TBLDEPARTMENT t
where ISACTIVE = 'Y' and 
      DEPTYPEID = '7'

-- salbar, tootsoonii tuv , tuv bank
SELECT dep.depid, dep.name, dep.deptypeid
SELECT *
    FROM TBLDEPARTMENT dep
    WHERE 
(dep.deptypeid = '5' or 
           dep.deptypeid = '6' or
           dep.deptypeid = '3'
           ) and dep.isactive = 'Y' and dep.depid = 95
   ORDER BY dep.name ASC;

-- ajiltang harya heltseer avah
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
       SELECT *
        from BI_HREMPLOYEE t
where  STATUS = n'Идэвхтэй'; --DEPID = '' and
--group worked year
-- ajiltan deer hailt hiih
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

----------------
-- New Employee

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

---------------------------------------
---------------------------------------
------HAPPY BIRTHDAY -- shorten later
SELECT LOWER(employeename) as employeename, 
       empid, 
       depid, 
       dname,
       pname,
       gender,
       birthdate,
       email, status,
       round(GROUPWORKEDYEAR,1) GROUPWORKEDYEAR
FROM BI_HREMPLOYEE t
WHERE STATUS = n'Идэвхтэй' 
AND EXTRACT( DAY FROM TO_DATE( birthdate,  'DD-Mon-YYYY' )) IN (Select TO_CHAR(sysdate, 'DD') from dual) 
AND EXTRACT( MONTH FROM TO_DATE( birthdate,  'DD-Mon-YYYY' )) IN (Select TO_CHAR(sysdate, 'MM') from dual) 

-------JobLEFT EMPLOYEE
SELECT employeename,
       mobilephone,
       dname,
       pname,
       gender
FROM BI_HREMPLOYEE 
Where status = N'Ажлаас Гарсан' and 
      Statusdate >= (SELECT SYSDATE - INTERVAL '1' YEAR FROM DUAL)
Order By statusdate desc;

--WORKED YEAR

-----Ajillasan hugatsaa

SELECT t.employeename, t.empid, t.hireddate, t.statusdate, t.status, ( (Select TO_CHAR(sysdate, 'YYYY') from dual) - EXTRACT(YEAR FROM
   TO_DATE(t.hireddate, 'YYYY-MM-DD'))) as "AJILLASAN JIL"
   FROM BI_HREMPLOYEE t
   Where t.status = N'Идэвхтэй'
   Order By hireddate;
   
   
   ------
   
SELECT employeename, 
       empid,
       hireddate, 
       depid, 
       pname, 
       emptype, 
       gender,
       mobilephone,
       email

   FROM BI_HREMPLOYEE t
   Where TO_DATE(t.HIREDDATE, 'YYYY-MM-DD') >= (SELECT SYSDATE - INTERVAL '9' MONTH FROM DUAL) AND  STATUS = n'Идэвхтэй' 
   Order By hireddate;
   ---
   
   
   
   
   
   
-- System date
SELECT TO_CHAR
    (SYSDATE, 'MM-DD-YYYY') as "NOW"
     FROM DUAL;
     
SELECT EXTRACT(DAY FROM DATE '1998-03-07') FROM DUAL;
-- useful
SELECT ADD_MONTHS(SYSDATE, -1)  AS PREV_MONTH, SYSDATE AS AJILD_ORSON_OGNOO,  
                                 ADD_MONTHS(SYSDATE, 1) as AJILLAAD_SAR_BOLOV 
FROM Dual 


--POST query get
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
-- Employee info
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
WHERE (status = (n'Идэвхтэй') or status = (n'Түр Эзгүй')) and empid like '17986%'
