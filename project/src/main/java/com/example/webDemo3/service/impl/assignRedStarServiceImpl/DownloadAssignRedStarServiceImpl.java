package com.example.webDemo3.service.impl.assignRedStarServiceImpl;

import com.example.webDemo3.dto.request.assignRedStarRequestDto.DownloadAssignRedStarRequestDto;
import com.example.webDemo3.entity.ClassRedStar;
import com.example.webDemo3.repository.ClassRedStarRepository;
import com.example.webDemo3.service.assignRedStarService.DownloadAssignRedStarService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class DownloadAssignRedStarServiceImpl implements DownloadAssignRedStarService {

    @Autowired
    private ClassRedStarRepository classRedStarRepository;

    @Override
    public ByteArrayInputStream download(DownloadAssignRedStarRequestDto data){
        //if(data.getClassId())
        List<ClassRedStar> assignList = classRedStarRepository.findAllByCondition(data.getClassId()
                ,data.getRedStar(),data.getFromDate());
        String[] COLUMNs = {"Lớp", "Sao đỏ"};
        try {
            Workbook workbook = new HSSFWorkbook();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            //CreationHelper createHelper = workbook.getCreationHelper();
            Sheet sheet = workbook.createSheet("phân công");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Row for Header
            Row headerRow = sheet.createRow(0);

            // Header
            for (int col = 0; col < COLUMNs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }

            int rowIdx = 1;
            for (ClassRedStar item : assignList) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(item.getClassSchool().getGrade() + " "
                        + item.getClassSchool().getGiftedClass().getName() );
                row.createCell(1).setCellValue(item.getClassRedStarId().getRED_STAR());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());

        }catch (Exception e){
            System.out.println(e);
        }

        return null;
    }

}
