using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

[System.Serializable]
public class QuestionData
{
    public string gameId;
    public string number;
    public string lat;
    public string lng;
    public string name;
    public string question;
    public Answers answers;
    public string correct_answer;

    [System.Serializable]
    public class Answers
    {
        public string a;
        public string b;
        public string c;
        public string d;
    }
}
[System.Serializable]
public class InitialData
{
  
    public string lat;
    public string lng;
    public string name;
    public string gameName;
    public string gameId;
    public string numberOfQuestions;



}
public class generateQrToJson : MonoBehaviour
{
    public static QuestionData allData;
    public static InitialData initialData;
    void Start()
    {

    }
    public QuestionData RefactorJson(string qrText)
    {
        Debug.Log(qrText);
        qrText = Cipher.CaesarCipher(qrText);
        Debug.Log(qrText);
        allData = JsonUtility.FromJson<QuestionData>(qrText);
 
        if(allData == null || allData.gameId != PlayerPrefs.GetString("gameId") || allData.name == null || allData.number == null || allData.lat == null || allData.lng == null || allData.question == null || allData.answers.a == null || allData.answers.b == null || allData.answers.c == null || allData.answers.d == null || allData.correct_answer == null) 
        {
          
           return null;
                
        }
        if (Int32.Parse(allData.number) != Int32.Parse(PlayerPrefs.GetString("number","0")) + 1)
        {
            return null;
        }

        PlayerPrefs.SetString("name", allData.name);
        PlayerPrefs.SetString("number",allData.number);
        PlayerPrefs.SetString("lat", allData.lat);
        PlayerPrefs.SetString("lng", allData.lng);
        
        return allData;

    }
    public InitialData RefactorJsonInitial(string qrText)
    {
        Debug.Log(qrText);
        qrText = Cipher.CaesarCipher(qrText);
        Debug.Log(qrText);

        initialData = JsonUtility.FromJson<InitialData>(qrText);
        if(initialData == null || initialData.gameId == null || initialData.gameName == null){
            return null;
        }
        PlayerPrefs.SetString("name", initialData.name);
        PlayerPrefs.SetString("lastNumber", initialData.numberOfQuestions);
        PlayerPrefs.SetString("gameId", initialData.gameId);
        PlayerPrefs.SetString("lat", initialData.lat);
        PlayerPrefs.SetString("lng", initialData.lng);
        
       return initialData;
     


    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
