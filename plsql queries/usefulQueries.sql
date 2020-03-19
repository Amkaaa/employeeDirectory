-- position
select * from TBLPOSITION t
-- side depart
select * from SIDEPARTMENTTYPE_TRL t
select * from TBLDEPARTMENT t
where ISACTIVE = 'Y' and DEPTYPEID = '1'
-- Salbar tootsoonii tuv
select * 
from tbldepartment;
-- employee detail
select * from TBLEMPLOYEE t
select * from SIPROFESSION t
select * from SIJOB_TRL t
select * from SIJOBTYPE t
select * from SIJOB t
select * from HRPOSITION_TRL t
select * from BI_HR_HIRED t
select * from BI_HREMPLOYEE t
select * from HRPOSGROUP t 
-- trainer detail
select * from TBLTRAINER t
select * from SMCONSTANT t
select * from SIHRREASON t
-- employee computer address
select * from TBLEMPLOYEE_TRL t
-- employee come in and come out
select * from TATIMEDATA_BU_20151023 t
-- employee activation
select * from TAATTENDANCETYPE t

-- system management
select * from SMMODULE t
-- system mail
select * from SMMAIL t
-- question
select * from SMFAQUESTION t
select * from SMFAQANSWER t
-- employee skill
select * from SISKILLLEVEL t
select * from SIPOSITION t
select * from SIPOSGENREQ t
select * from SIPERSONALDOCTYPE t
select * from SIGRADE t -- employee level
--employee type
select * from SIEMPLOYMENTTYPE t 
select * from HRVACATIONREQUEST t --vacation
--employee degree
select * from SIEDUCATIONLEVEL t
-- employee document
select * from SIDOCTEMPLATE t
-- employee contact info
select * from SICONTACT t
