﻿select * from bi_hremployee t where t.companyid = N'ХАС';

AL32UTF8

select value from nls_database_parameters where parameter='NCHAR_CHARACTERSET' for update;

AMERICAN_AMERICA.WE8MSWIN1252
   ALTER SESSION SET NLS_LANGUAGE = 'AMERICAN';

                  ALTER SESSION SET NLS_TERRITORY = 'AMERICA';
                  
                  
                  SELECT * FROM V$NLS_PARAMETERS

where parameter in('NLS_LANGUAGE','NLS_TERRITORY'); 

                  SELECT USERENV('LANG') FROM DUAL;
