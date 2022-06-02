package com.example.petadoptionproject.services;


import com.amazonaws.services.s3.AmazonS3;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;



@Service
@Slf4j
public class S3Service {
    @Value("${aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 s3Client;


    public String uploadFile(MultipartFile file) {
        File convertedFile = convertMultipartFileToFile(file);
        // generate a unique-ish s3 filename based on file's name + current time
        String fileName = file.getOriginalFilename();
        s3Client.putObject(bucket, fileName, convertedFile);
        convertedFile.delete();
        // return the file's s3 name since you may need to store it somewhere
        return fileName;
    }

    private File convertMultipartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try(FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return convertedFile;
    }

}


