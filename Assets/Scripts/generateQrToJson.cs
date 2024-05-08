using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class QuestionData
{
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
    public void RefactorJson(string qrText)
    {
        allData = JsonUtility.FromJson<QuestionData>(qrText);
        PlayerPrefs.SetString("name", allData.name);
        PlayerPrefs.SetString("number",allData.number);
        PlayerPrefs.SetString("lat", allData.lat);
        PlayerPrefs.SetString("lng", allData.lng);

    }
    public void RefactorJsonInitial(string qrText)
    {
        initialData = JsonUtility.FromJson<InitialData>(qrText);
        PlayerPrefs.SetString("name", initialData.name);
        PlayerPrefs.SetString("lastNumber", initialData.numberOfQuestions);
        PlayerPrefs.SetString("lat", initialData.lat);
        PlayerPrefs.SetString("lng", initialData.lng);

    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
