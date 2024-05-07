using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;


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

public class questions : MonoBehaviour
{
    public static QuestionData allData;
    public TMP_Text question;
    public TMP_Text answer1;
    public TMP_Text answer2;
    public TMP_Text answer3;
    public TMP_Text answer4;
    public string correctAnswer;


    QuestionData questionData = JsonUtility.FromJson<QuestionData>(QRCodeScanner.qrText);


    void Start()
    {
        if (questionData != null)
        {
            correctAnswer = questionData.correct_answer;
            allData = questionData;
            question.text = questionData.question;
            answer1.text = questionData.answers.a;
            answer2.text = questionData.answers.b;
            answer3.text = questionData.answers.c;
            answer4.text = questionData.answers.d;

        }
        
       
     
       
   
    }

    // Update is called once per frame
   public void sendRespone(string answer)
    {
        if(answer == correctAnswer)
        {
            SceneManager.LoadScene("nextLocationScene");
        }
    }
}
