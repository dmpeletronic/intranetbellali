/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var getDBLink = function () {
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1XQhBPx-YLj9Dtr9J1Hh_E3J0_J7x03CZkajdOhSeinY/pubhtml';
    return public_spreadsheet_url;
};

function converteMoedaFloat(valor){ 
  if(valor === ""){
    valor =  0;
  }else{
    valor = valor.replace("R","");
    valor = valor.replace("$","");
    valor = valor.replace(".","");
    valor = valor.replace(",",".");
    valor = parseFloat(valor);
  }
  return valor;
};

var buscaProduto = function (data, codigo) {
  var i;
  for(i=0; i<data.elements.length; i++) {
    if(codigo==data.elements[i].Codigo) {
    break;
    } 
  }
  if(i==data.elements.length) {
    return null;
  } 
  return data.elements[i];
};

var boxProdutoSimples = function(elements) {
    var div = "<div class='produto' style='width:320;'>";
    var _div = "</div>";
    var link = "<a href="+elements.CaminhoImagem+" target=blank>"; 
    var _link = "</a>";
    var img = "<img src='"+ elements.CaminhoImagem +
            "' width='320' height='240' alt='"+elements.Codigo+
            "' title='"+elements.Codigo+
            " Saldo:"+elements.SaldoEstoque+
            " Preco:"+elements.PrecoVenda+"'>";
    var html = div + link + img + _link + _div;
    return html;
};
var boxProduto = function(elements) {
    var div = "<div class='produto'>";
    var _div = "</div>";
    var table = "<table  border=1 width=500> <tbody>";
    var _table = "</tbody> </table>";
    var link = "<a href="+elements.CaminhoImagem+" target=blank>"; 
    var _link = "</a>";
    var row = "<tr>";
    var _row = "</tr>";
    var col1 = "<td rowspan=4 width=320>";
    var col = "<td>";
    var col2 = "<td class=col2>";
    var _col = "</td>";
    var img = "<img src='"+ elements.CaminhoImagem +
            "'  alt='"+elements.Codigo+
            "' title='"+elements.Codigo+
            " Saldo:"+elements.SaldoEstoque+
            " Preco:"+elements.PrecoVenda+"'>";
    var html = div + table +
            row + 
              col1 + link + img + _link + _col +
              col2 + "Codigo:" + _col +
              col + elements.Codigo + _col +
            _row+
            row+
            col2 + "Preco:" + _col +
            col + elements.PrecoVenda + _col +
            _row+
            row+
            col2 + "Qtde:" + _col +
            col + elements.SaldoEstoque + _col +
            _row+
            row+
            col2 + "Descricao:" + _col +
            col + elements.Descricao + _col+
            _row +
            _table + _div;
    return html;    
};

var totalVendas = function (data) {
  var total_valor = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {
    var produto = buscaProduto(data.Produtos, data.Vendas.elements[i].CodigoProduto);
     if (produto==null) {
      continue;
    }            
    var valor = converteMoedaFloat(data.Vendas.elements[i].ValorTotal);
    total_valor += valor;
  }
  return total_valor.toFixed(2);
};

var totalCustoMercadoriaVendida = function (data) {
  var cmv = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {
     var produto = buscaProduto(data.Compras, data.Vendas.elements[i].CodigoProduto);
     var qtde = parseInt(data.Vendas.elements[i].Quantidade);
     cmv += qtde*converteMoedaFloat(produto.ValorPago);
  }
  return cmv.toFixed(2);
};

var totalEmEstoque = function (data) {
  var total = 0;
  for(var i=0; i < data.Produtos.elements.length; i++) {
    var qtde = parseInt(data.Produtos.elements[i].SaldoEstoque);
    var prc_unit = converteMoedaFloat(data.Produtos.elements[i].PrecoVenda);
    total += qtde*prc_unit;
  }
  return total.toFixed(2);
};

var totalComissoes = function (data) {
  var total = 0;
  for(var i=0; i< data.Vendas.elements.length; i++) {           
    var valor = converteMoedaFloat(data.Vendas.elements[i].Comissao);
    total += valor;
  }
  return total.toFixed(2);
};

var totalVendaPasta = function (data, pasta) {
  var propModelo = "ModeloP"+(pasta);
  var propQtde = "QuantidadeP"+(pasta);
  var total=0;
  for(var i=0; i<data.PastasConsignadas.elements.length; i++) {
    var linha = data.PastasConsignadas.elements[i];
    if(linha[propModelo] === "" ) {
      break;
    }
    var produto = buscaProduto(data.Produtos, linha[propModelo]);
    if (produto==null) {
      break;
    }
    var qtde = parseInt(linha[propQtde]);
    total += qtde*converteMoedaFloat(produto.PrecoVenda);
  }
  return total.toFixed(2);
};

var totalCustoPasta = function (data, pasta) {
  var propModelo = "ModeloP"+(pasta);
  var propQtde = "QuantidadeP"+(pasta);
  var total=0;
  for(var i=0; i<data.PastasConsignadas.elements.length; i++) {
    var linha = data.PastasConsignadas.elements[i];
    if(linha[propModelo] === "" ) {
      break;
    }
    var produto = buscaProduto(data.Compras, linha[propModelo]);
    if (produto==null) {
      break;
    }
    var qtde = parseInt(linha[propQtde]);
    total += qtde*converteMoedaFloat(produto.ValorPago);
  }
  return total.toFixed(2);
};

var totalItensPasta = function (data, pasta) {
  var total=0;
  for(var i=0; i<data.PastasConsignadas.elements.length;i++) {
    var linha = data.PastasConsignadas.elements[i];
    var prop = "QuantidadeP"+(pasta);
    if(linha[prop] === "" ) {
      break;
    }
    total += parseInt(linha[prop]);
  }
  return total;
};

var totalDePastas = function (data) {
  var total = data.PastasConsignadas.column_names.length/2;
  return total;
};

var buscaProprietarioPasta = function (data, pasta) {
  for(var i=0; i<data.Revendedores.elements.length; i++) {
    if( (data.Revendedores.elements[i].PrimeiraPasta == pasta) ||
        (data.Revendedores.elements[i].SegundaPasta == pasta) ||
        (data.Revendedores.elements[i].Terceira == pasta)) {
        return data.Revendedores.elements[i].Nome;
    }
  }
  return "Proprietario nao encontrado";
};

var tabelaPastas = function(data) {
  var html = "";
  var total_pastas = totalDePastas(data);
  for(var pasta=1; pasta<=total_pastas; pasta++) {
    var owner = buscaProprietarioPasta(data, pasta);
    var itens = totalItensPasta(data, pasta);
    var custo = totalCustoPasta(data, pasta);
    var venda = totalVendaPasta(data, pasta);
    html += "<tr>\n\
                  <td> "+pasta+" </td>\n\
                  <td> "+owner+" </td>\n\
                  <td> "+itens+"</td>\n\
                  <td> R$"+custo+"</td>\n\
                  <td> R$"+venda+"</td>\n\
             </tr> \n";
  }
  return html;
};
