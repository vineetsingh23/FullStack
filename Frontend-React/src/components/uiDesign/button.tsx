import React from 'react';

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg" ;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?:ButtonVariant;
    size?:ButtonSize;
    children:React.ReactNode;
}

const baseStyles = "px-4 py-2 m-2 rounded-sm font-semibold transition-colors focus:ring-2 focus:outline-none";

const variantStyles:Record<ButtonVariant,string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-gray-400 text-gray-800",
    danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
    success:"bg-green-600 text-white hover:bg-green-600 focus:ring-green-400",
};

const sizeStyles:Record<ButtonSize,string> = {
  sm: "px-2.5 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

// type ButtonVariant = keyof typeof buttonVariants;


export function Button({variant='primary',size ='md', children,...props}: ButtonProps) {
  return (
    <button className={`  ${baseStyles} ${variantStyles[variant]}  ${sizeStyles[size]}`} {...props}>{children}</button>
  )
}





export type CardVariant = "outlined" | "elevated" | "flat";


export interface CardProps extends React.HTMLAttributes<HTMLDivElement>{
    variant?:CardVariant;
    children:React.ReactNode;
}
const baseCardStyles = "rounded bg-white overflow-hidden";

const cardStyle:Record<CardVariant,string> = {
outlined: "border border-gray-200",
    elevated: "shadow-md hover:shadow-lg transition-shadow",
    flat:"bg-gray-50"
}

export function Card ({variant="outlined",children,className="",...props}:CardProps){
    return (
        <div className={`${baseCardStyles} ${cardStyle[variant]} ${className}`.trim()} {...props}>
            {children}
        </div>
        
    )
}
