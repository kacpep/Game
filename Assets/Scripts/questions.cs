using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;



public class questions : MonoBehaviour
{
 
    public TMP_Text question;
    public TMP_Text answer1;
    public TMP_Text answer2;
    public TMP_Text answer3;
    public TMP_Text answer4;
    public string correctAnswer;

    QuestionData questionData = generateQrToJson.allData;



    void Start()
    {
        
        if (questionData != null)
        {
            correctAnswer = questionData.correct_answer;
            
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
