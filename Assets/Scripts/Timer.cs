using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Timer : MonoBehaviour
{
    // Start is called before the first frame update

    public Slider timeSlider;

    public GameObject timeOver;

    bool timeStopped = false;

    public float targetTime = 10.0f ;

  

    void Start()
    {
        timeSlider.value = targetTime;
        timeSlider.maxValue = targetTime;
    }

    // Update is called once per frame
    void Update()
    {
      
		if (targetTime <= 0.0f && !timeStopped)  {
            timeStopped = true;
			timerEnded();

		}else{
            if(!timeStopped){
                  targetTime -= Time.deltaTime;
                 timeSlider.value = targetTime;
            }
        
        }

        
    }
    void timerEnded(){
            
            timeOver.SetActive(true);
            
    }
}