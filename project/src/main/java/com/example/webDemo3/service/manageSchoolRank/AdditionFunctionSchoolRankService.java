package com.example.webDemo3.service.manageSchoolRank;

import java.sql.Date;

public interface AdditionFunctionSchoolRankService {
    String addHistory(String oldhistory, String userName, Date date);
    Date convertDateInComputerToSqlDate();
    String convertSqlDateToString(Date date);
}
