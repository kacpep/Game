using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.UI;

public class Cipher : MonoBehaviour
{
    void Start()
    {
        
    }

    void Update()
    {
        
    }
    static public string CaesarCipher(string input, int shift = -5)
    {
        if (shift == 0) return input;

        StringBuilder builder = new StringBuilder(); //stringbuilder class for ease of use

        for (int i = 0; i < input.Length; i++)
        {
            char c = input[i];
            char c2 = c;
            if (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')) || ((c >= '0') && (c <= '9')))
            {
                c2 = (char)(c + shift); 

                if ((c >= 'a') && (c <= 'z')) 
                {
                    c2 = CharBindToRange(c2, 'a', 'z'); 
                }
                else if ((c >= 'A') && (c <= 'Z'))
                {
                    c2 = CharBindToRange(c2, 'A', 'Z');
                }
                else if ((c >= '0') && (c <= '9'))
                {
                    c2 = CharBindToRange(c2, '0', '9');
                }
            }
            builder.Append(c2); //add the processed character to output
        }
        return builder.ToString(); //return the processed string
    }
    static protected char CharBindToRange(char cinp, char low, char high) //clamps char to specified range
    {
        if (low >= high) { return '?'; }
        if (cinp > high)
        {
            cinp = (char)(low + (cinp - high) - 1);
        }
        else if (cinp < low)
        {
            cinp = (char)(high - (low - cinp) + 1);
        }
        return cinp;
    }

}
