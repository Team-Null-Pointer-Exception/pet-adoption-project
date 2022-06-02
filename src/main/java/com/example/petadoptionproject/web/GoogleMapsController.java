package com.example.petadoptionproject.web;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


// this is a proxy. basically making a call to our own controller so it can make a cal to the google api
@Controller
public class GoogleMapsController {
    @Value("${googleAPIKey}")
    private String googleAPIKey;

    @ResponseBody //when you want raw data back you must use this annotation
    @GetMapping("/gogglemap/**")
    public String getMap(HttpServletRequest request) throws IOException {
        String urlToCall = buildRequestURL(request,googleAPIKey);
        return makeHttpRequest(urlToCall);
    }

    private String buildRequestURL(HttpServletRequest request, String apiKey){
        String baseDomain = "https://maps.googleapis.com/";
        String baseurlWithQueryParams = (request.getRequestURI().split("/gogglemap/")[1]) + "?" + request.getQueryString();
        String apiKeyQueryParam = "&key=" + apiKey;
        return baseDomain + baseurlWithQueryParams + apiKeyQueryParam;
    }

    private String makeHttpRequest(String urlToCall){
        try {
            URL url = new URL(urlToCall);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        }catch (Exception ex){
            return ex.getMessage();
        }
    }
}