//
//  TOViewController.m
//  buttonclick
//
//  Created by Jackson Harper on 12/4/12.
//  Copyright (c) 2012 Jackson Harper. All rights reserved.
//

#import "TOViewController.h"

@interface TOViewController ()

@end

@implementation TOViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)buttonTouchUpInside:(id)sender
{
    [[self textField] setText:@"Clicked"];
}


@end
