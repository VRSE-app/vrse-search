# Visual Cryptography Script

## Introduction

Hi everyone and welcome to our presentation on the Theory and Application of Visual Cryptography

Today we will begin by providing a brief definition of Visual Cryptgraphy, building up its mathematical formulation and then conclude by outlining some of the applications of this cryptographic technique.

If you are interested in reading more about any of the content covered in this presentation our third slide shows a list of references we used in the development of this presentation and our research.

## Visual Cryptography

Let us begin by considering the problem of encrypting written material. Printed, handwritten text, images - visual information in general are everywhere in our society and with more and more personal data in our digital footprints, there is a growing need to encrypt and protect our personal and private information.

Visual Cryptography is a perfectly secure cryptographic scheme proposed in 1995 by M. Naor and A. Shamir, one of the inventors of RSA, in which visual information is encrypted in indistinguishable layers without any cryptographic computations.

Each layer from a surface level looks completely random and the original message is decrypted by stacking the layers, after which, the result can even be decoded by the human visual system.

## Basic Model

The basic Visual Cryptography Model consists of two components: a ciphertext and a transparency.

The ciphertext is the transmitted (encoded) message and a transparency acts as a secret key. By overlaying the secret key and the ciphertext, we see the original picture, even though each individually is indistinguishable from random noise.

It should be noted that this is somewhat similar to one time pad covered in the lectures because each ciphertext page is decrypted with a different transparency.

## Important parameters of a scheme

Read from slide

## bottom of slide 12 and slide 13

- So, in a 2 by 2 example the 2x2 matrix can be split into horizontal, vertical or diagonal complementary shares. Every share has the same grey level - it is equally white and black and so cannot be distinguished on its own as a white or a black pixel. 
- However, if we overlay two complementary shares the resulting pixel is clearly black, while if we overlay two of the same shares, the resulting pixel is still 50% white and 50% black and so perceived as grey by the human visual system (and not black)

- This can be extended to the 4 out of 4 visual secret sharing problem 
- In this setup, the centre pixel is always black and is present to maintain the aspect ratio.
- Each single share has 5 black subpixels, any overlaid four shares will contain 8 OR 9 black subpixels - 8 for a white pixel and 9 black subpixels for a black pixel
- clearly you need all four shares in this scenario to distinguish between black and white so this is a 4 out of 4 VC scheme to reveal the cleartext

The original message is divided into two shares - one deployed through the user's AR device, and the other rendered on a nearby display

When the two shares are overlaid, a visual XOR operation is performed and the user can see the original message!
