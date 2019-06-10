<?php
/**
 * Created by PhpStorm.
 * User: nahuel
 * Date: 24/06/2018
 * Time: 19:48
 */

extract($_POST, EXTR_PREFIX_SAME, "post_");

$d_stripe_general = get_option('direct_stripe_general_settings');

$button_id  = isset($params['button_id']) ? $params['button_id'] : '';
$token         = isset($stripeToken) ? $stripeToken : '';
$payment_method_id = isset($paymentMethodID) ? $paymentMethodID : '';
$payment_intent_id = isset($paymentIntentID) ? $paymentIntentID : '';
$email_address = isset($stripeEmail) ? $stripeEmail : '';

/****  Amount ****/
if( $params['type'] === 'payment' ) {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    if (isset($params['value']) && $params['value'] != '0') {
        $amount = $amount * 100;
    }
} elseif( $params['type'] === 'donation' ) {
    $pre_amount = isset($_POST['amount']) ? $_POST['amount'] : '';
    if ( isset($params['zero_decimal']) && $params['zero_decimal'] === "1" || isset($params['zero_decimal']) && $params['zero_decimal'] === "true" ) {
        $amount = $pre_amount;
    } else {
        $amount = $pre_amount * 100;
    }
    $amount = apply_filters( 'ds_donation_amount', $amount);
} elseif( $params['type'] === 'subscription' ) {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount     = base64_decode($pre_amount);
    $coupon     = isset($params['coupon']) ? $params['coupon'] : '';
    $setup_fee  = isset($params['setup_fee']) ? $params['setup_fee'] : '';
} elseif( $params['type'] === 'update' ) {
    $pre_amount = isset($params['amount']) ? $params['amount'] : '';
    $amount    = base64_decode($pre_amount);
}

/****  Options ****/
if ($params['capture'] === false || $params['capture'] === 'false' ) {
    $capture = false;
} else {
    $capture = true;
}
$description = isset($params['description']) ? $params['description'] : '';

$custom_role = isset($params['custom_role']) ? $params['custom_role'] : '';
if ( ! empty($custom_role) && wp_roles()->is_role($custom_role) == false) {
    add_role($custom_role, __('Direct Stripe ' . $custom_role, 'direct-stripe'), array('read' => true));
}

if ( ! empty($params['currency'])) {
    $currency = $params['currency'];
} else {
    $currency = $d_stripe_general['direct_stripe_currency'];
}
